import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CurrencyService} from '../../services/currency.service';
import {Subject, takeUntil} from 'rxjs';
import {AnswerCurrency} from '../../types/currencyServer-answer';

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

  protected currentValue: AnswerCurrency | null = null;

  private readonly currencyService: CurrencyService = inject(CurrencyService);

  public readonly exchangeForm: FormGroup<IExchangeForm> = new FormGroup<IExchangeForm>({
    give: new FormControl(null),
    receive: new FormControl(null),
  });

  public ngOnInit(): void {
    this.currencyService
      .getCurrentExchangeRate('USD')
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: AnswerCurrency) => {
        this.currentValue = data;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
