import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CurrencyService} from '../../services/currency.service';
import {combineLatest, debounceTime, filter, Observable, of, Subject, switchMap, takeUntil} from 'rxjs';
import {AnswerCurrency} from '../../types/currencyServer-answer';
import {ExchangeService} from '../../services/exchange.service';
import {BankInfo} from '../../types/bank-info';
import {AnswerCryptoGecko} from '../../types/cryptoServer-answer';

interface IExchangeForm {
  give: FormControl<string | null>;
  receive: FormControl<string | null>;
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
})
export class ExchangeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private readonly currencyService: CurrencyService = inject(CurrencyService);
  protected readonly exchangeService: ExchangeService = inject(ExchangeService);

  protected selectedGiveImage: string = 'assets/none.svg';
  protected selectedReceiveImage: string = 'assets/none.svg';

  protected currentValue: AnswerCurrency | null = null;
  protected selectedCrypto: AnswerCryptoGecko | null = null;

  public readonly exchangeForm: FormGroup<IExchangeForm> = new FormGroup<IExchangeForm>({
    give: new FormControl(null),
    receive: new FormControl(null),
  });

  public ngOnInit(): void {
    this.exchangeForm.controls.give.valueChanges
      .pipe(
        filter((value: string | null) => !!value),
        debounceTime(300),
        switchMap((value: string | null) => this.calculateReceiveValue(Number(value))),
        takeUntil(this.destroy$),
      )
      .subscribe((receiveValue: number) => {
        this.exchangeForm.controls.receive.setValue(receiveValue.toString(), {emitEvent: false});
      });

    this.exchangeForm.controls.receive.valueChanges
      .pipe(
        filter((value: string | null) => !!value),
        debounceTime(300),
        switchMap((value: string | null) => this.calculateGiveValue(Number(value))),
        takeUntil(this.destroy$),
      )
      .subscribe((giveValue: number) => {
        this.exchangeForm.controls.give.setValue(giveValue.toString(), {emitEvent: false});
      });

    this.currencyService
      .getCurrentExchangeRate('USD')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: AnswerCurrency) => {
        this.currentValue = data;
      });

    this.exchangeService.giveValue$.pipe(takeUntil(this.destroy$)).subscribe((item: BankInfo | AnswerCryptoGecko) => {
      this.selectedGiveImage = item.image;
      this.selectedCrypto = item as AnswerCryptoGecko;
    });

    this.exchangeService.receiveValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: BankInfo | AnswerCryptoGecko) => {
        this.selectedReceiveImage = item.image;
        this.selectedCrypto = item as AnswerCryptoGecko;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected changeFields(): void {
    const giveValue: string | null = this.exchangeForm.controls.give.value;
    const receiveValue: string | null = this.exchangeForm.controls.receive.value;

    this.exchangeForm.patchValue({
      give: receiveValue,
      receive: giveValue,
    });

    const tempImage: string | null = this.selectedGiveImage;
    this.selectedGiveImage = this.selectedReceiveImage;
    this.selectedReceiveImage = tempImage;
  }

  private calculateReceiveValue(giveValue: number): Observable<number> {
    return combineLatest([this.exchangeService.selectedCurrencyRate]).pipe(
      switchMap(([rate]): Observable<number> => {
        if (this.selectedCrypto) {
          return of(giveValue * (this.selectedCrypto.current_price / rate));
        }
        return of(giveValue * rate);
      }),
    );
  }

  private calculateGiveValue(receiveValue: number): Observable<number> {
    return combineLatest([this.exchangeService.selectedCurrencyRate]).pipe(
      switchMap(([rate]): Observable<number> => {
        if (this.selectedCrypto) {
          return of((receiveValue / this.selectedCrypto.current_price) * rate);
        } else {
          return of(receiveValue / rate);
        }
      }),
    );
  }
}
