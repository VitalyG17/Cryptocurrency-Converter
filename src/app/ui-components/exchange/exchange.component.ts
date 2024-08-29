import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {combineLatest, debounceTime, filter, Observable, of, Subject, switchMap, takeUntil, tap} from 'rxjs';
import {ExchangeService} from '../../services/exchange.service';
import {BankInfo} from '../../types/bank-info';
import {AnswerCryptoGecko, isAnswerCryptoGecko} from '../../types/cryptoServer-answer';

interface IExchangeForm {
  give: FormControl<string | null>;
  receive: FormControl<string | null>;
}

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private readonly changeButtonClick$: Subject<void> = new Subject<void>();

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  protected readonly exchangeService: ExchangeService = inject(ExchangeService);

  protected selectedGiveImage: string = 'assets/none.svg';
  protected selectedReceiveImage: string = 'assets/none.svg';

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
        const roundedValue: string = receiveValue.toFixed(6);
        this.exchangeForm.controls.receive.setValue(roundedValue, {emitEvent: false});
      });

    this.exchangeForm.controls.receive.valueChanges
      .pipe(
        filter((value: string | null) => !!value),
        debounceTime(300),
        switchMap((value: string | null) => this.calculateGiveValue(Number(value))),
        takeUntil(this.destroy$),
      )
      .subscribe((giveValue: number) => {
        const roundedValue: string = giveValue.toFixed(6);
        this.exchangeForm.controls.give.setValue(roundedValue, {emitEvent: false});
      });

    this.exchangeService.giveValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: BankInfo | AnswerCryptoGecko | null) => {
        if (item) {
          this.selectedGiveImage = item.image;
          if (isAnswerCryptoGecko(item)) {
            this.selectedCrypto = item;
          }
        }
        this.recalculateValues();
        this.cdr.markForCheck();
      });

    this.exchangeService.receiveValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe((item: BankInfo | AnswerCryptoGecko | null) => {
        if (item) {
          this.selectedReceiveImage = item.image;
          if (isAnswerCryptoGecko(item)) {
            this.selectedCrypto = item;
          }
        }
        this.recalculateValues();
        this.cdr.markForCheck();
      });

    this.exchangeService.selectedGiveCurrency.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.recalculateValues();
      this.cdr.markForCheck();
    });

    this.exchangeService.selectedReceiveCurrency.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.recalculateValues();
      this.cdr.markForCheck();
    });

    this.changeButtonClick$.pipe(tap(() => this.changeFieldsForm())).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected onChangeButtonClick(): void {
    this.changeButtonClick$.next();
  }

  private recalculateValues(): void {
    const giveValue: string | null = this.exchangeForm.controls.give.value;
    const receiveValue: string | null = this.exchangeForm.controls.receive.value;

    if (giveValue) {
      this.calculateReceiveValue(Number(giveValue)).subscribe((newReceiveValue: number) => {
        this.exchangeForm.controls.receive.setValue(newReceiveValue.toFixed(6), {emitEvent: false});
      });
    } else if (receiveValue) {
      this.calculateGiveValue(Number(receiveValue)).subscribe((newGiveValue: number) => {
        this.exchangeForm.controls.give.setValue(newGiveValue.toFixed(6), {emitEvent: false});
      });
    }
  }

  private calculateReceiveValue(giveValue: number): Observable<number> {
    return combineLatest([
      this.exchangeService.selectedGiveCurrencyRate,
      this.exchangeService.selectedReceiveCurrencyRate,
    ]).pipe(
      switchMap(([giveRate, receiveRate]: [number, number]): Observable<number> => {
        if (this.selectedCrypto) {
          return of(giveValue / this.selectedCrypto.current_price);
        } else {
          return of(giveValue * (receiveRate / giveRate));
        }
      }),
    );
  }

  private calculateGiveValue(receiveValue: number): Observable<number> {
    return combineLatest([
      this.exchangeService.selectedGiveCurrencyRate,
      this.exchangeService.selectedReceiveCurrencyRate,
    ]).pipe(
      switchMap(([giveRate, receiveRate]: [number, number]): Observable<number> => {
        if (this.selectedCrypto) {
          return of(receiveValue * this.selectedCrypto.current_price);
        } else {
          return of(receiveValue * (giveRate / receiveRate));
        }
      }),
    );
  }

  private changeFieldsForm(): void {
    const tempValue: string | null = this.exchangeForm.controls.give.value;
    const tempImage: string = this.selectedGiveImage;

    this.exchangeForm.controls.give.setValue(this.exchangeForm.controls.receive.value, {emitEvent: false});
    this.exchangeForm.controls.receive.setValue(tempValue, {emitEvent: false});

    this.selectedGiveImage = this.selectedReceiveImage;
    this.selectedReceiveImage = tempImage;
  }
}
