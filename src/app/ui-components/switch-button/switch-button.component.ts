import {Component, EventEmitter, Output} from '@angular/core';
import {PaymentOption} from '../../types/paymentOption';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
})
export class SwitchButtonComponent {
  @Output() switchOption: EventEmitter<PaymentOption> = new EventEmitter<PaymentOption>();

  protected selectedOption: PaymentOption | null = null;

  public selectOption(option: PaymentOption): void {
    this.selectedOption = option;
    this.switchOption.emit(option);
  }

  protected readonly PaymentOption = PaymentOption;
}
