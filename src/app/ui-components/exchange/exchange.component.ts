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

  protected selectedGiveCrypto: AnswerCryptoGecko | null = null;
  protected selectedReceiveCrypto: AnswerCryptoGecko | null = null;

  public readonly exchangeForm: FormGroup<IExchangeForm> = new FormGroup<IExchangeForm>({
    give: new FormControl(null),
    receive: new FormControl(null),
  });

  public ngOnInit(): void {
    this.exchangeForm.controls.give.valueChanges
      .pipe(
        filter((value: string | null) => !!value),
        debounceTime(300),
        switchMap((value: string | null) => {
          if (this.selectedGiveCrypto) {
            return this.calculateReceiveValueCrypto(Number(value));
          } else {
            return this.calculateReceiveValue(Number(value));
          }
        }),
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
        switchMap((value: string | null) => {
          if (this.selectedReceiveCrypto) {
            return this.calculateGiveValueCrypto(Number(value));
          } else {
            return this.calculateGiveValue(Number(value));
          }
        }),
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
            this.selectedGiveCrypto = item;
          } else {
            this.selectedGiveCrypto = null;
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
            this.selectedReceiveCrypto = item;
          } else {
            this.selectedReceiveCrypto = null;
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
      if (this.selectedGiveCrypto) {
        this.calculateReceiveValueCrypto(Number(giveValue)).subscribe((newReceiveValue: number) => {
          this.exchangeForm.controls.receive.setValue(newReceiveValue.toFixed(6), {emitEvent: false});
        });
      } else {
        this.calculateReceiveValue(Number(giveValue)).subscribe((newReceiveValue: number) => {
          this.exchangeForm.controls.receive.setValue(newReceiveValue.toFixed(6), {emitEvent: false});
        });
      }
    } else if (receiveValue) {
      if (this.selectedReceiveCrypto) {
        this.calculateGiveValueCrypto(Number(receiveValue)).subscribe((newGiveValue: number) => {
          this.exchangeForm.controls.give.setValue(newGiveValue.toFixed(6), {emitEvent: false});
        });
      } else {
        this.calculateGiveValue(Number(receiveValue)).subscribe((newGiveValue: number) => {
          this.exchangeForm.controls.give.setValue(newGiveValue.toFixed(6), {emitEvent: false});
        });
      }
    }
  }

  private calculateReceiveValue(giveValue: number): Observable<number> {
    return combineLatest([
      this.exchangeService.selectedGiveCurrencyRate,
      this.exchangeService.selectedReceiveCurrencyRate,
    ]).pipe(
      switchMap(([giveRate, receiveRate]: [number, number]): Observable<number> => {
        return of(giveValue * (receiveRate / giveRate));
      }),
    );
  }

  private calculateGiveValue(receiveValue: number): Observable<number> {
    return combineLatest([
      this.exchangeService.selectedGiveCurrencyRate,
      this.exchangeService.selectedReceiveCurrencyRate,
    ]).pipe(
      switchMap(([giveRate, receiveRate]: [number, number]): Observable<number> => {
        return of(receiveValue * (giveRate / receiveRate));
      }),
    );
  }

  //Вычисления значений полей, если в двух инпутах крипта
  private calculateReceiveValueCrypto(giveValue: number): Observable<number> {
    if (this.selectedGiveCrypto && this.selectedReceiveCrypto !== null) {
      return of((giveValue * this.selectedGiveCrypto.current_price) / this.selectedReceiveCrypto.current_price);
    } else {
      return of(0);
    }
  }

  private calculateGiveValueCrypto(receiveValue: number): Observable<number> {
    if (this.selectedReceiveCrypto && this.selectedGiveCrypto !== null) {
      return of((receiveValue * this.selectedReceiveCrypto.current_price) / this.selectedGiveCrypto.current_price);
    } else {
      return of(0);
    }
  }

  private changeFieldsForm(): void {
    const tempValue: string | null = this.exchangeForm.controls.give.value;
    const tempImage: string = this.selectedGiveImage;
    const tempCrypto: AnswerCryptoGecko | null = this.selectedGiveCrypto;

    this.exchangeForm.controls.give.setValue(this.exchangeForm.controls.receive.value, {emitEvent: false});
    this.exchangeForm.controls.receive.setValue(tempValue, {emitEvent: false});

    this.selectedGiveImage = this.selectedReceiveImage;
    this.selectedReceiveImage = tempImage;

    this.selectedGiveCrypto = this.selectedReceiveCrypto;
    this.selectedReceiveCrypto = tempCrypto;
  }
}
