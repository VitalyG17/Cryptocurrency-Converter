import {ChangeDetectorRef, Component, inject, Input, OnInit} from '@angular/core';
import {CurrencyService} from '../../services/currency.service';
import {AnswerCurrency} from '../../types/currencyServer-answer';
import {ExchangeService} from '../../services/exchange.service';
import {ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectCurrencyComponent implements OnInit {
  @Input() public isCrypto: boolean = false;

  protected hasError: boolean = false;

  protected currency: string[] = [];

  protected currentIndex: number = 0;

  protected itemsPerPage: number = 4;

  protected conversionRates: {[key: string]: number} = {};

  protected selectedCurrency: string = 'RUB';

  protected selectedCrypto: boolean = true;

  private readonly currencyService: CurrencyService = inject(CurrencyService);

  private readonly exchangeService: ExchangeService = inject(ExchangeService);

  private readonly cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  public ngOnInit(): void {
    this.currencyService.getCurrentExchangeRate('RUB').subscribe((data: AnswerCurrency) => {
      if (data && data.conversion_rates && Object.keys(data.conversion_rates).length > 0) {
        this.conversionRates = data.conversion_rates;
        this.currency = Object.keys(this.conversionRates);
        this.hasError = false;
      } else {
        this.hasError = true;
      }
      this.cdr.markForCheck();
    });
  }

  protected getPaginatedCurrency(): string[] {
    return this.currency.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  protected changePage(direction: number): void {
    const newIndex: number = this.currentIndex + direction * this.itemsPerPage;

    if (newIndex >= 0 && newIndex < this.currency.length) {
      this.currentIndex = newIndex;
    }
  }

  protected onCurrencySelect(curr: string): void {
    const rate: number = this.conversionRates[curr];
    this.exchangeService.updateCurrency(curr, rate);
    this.selectedCurrency = curr;
  }
}
