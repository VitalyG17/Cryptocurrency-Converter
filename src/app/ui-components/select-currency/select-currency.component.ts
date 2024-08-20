import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-select-currency',
  templateUrl: './select-currency.component.html',
  styleUrls: ['./select-currency.component.scss'],
})
export class SelectCurrencyComponent {
  @Input() isCrypto: boolean = false;

  protected currency: string[] = ['Все', 'Рубли', 'Доллары', 'Евро'];
}
