import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {PaymentOption} from '../../types/paymentOption';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchButtonComponent {
  @Output() public switchOption: EventEmitter<PaymentOption> = new EventEmitter<PaymentOption>();

  protected readonly PaymentOption = PaymentOption;

  protected selectedOption: PaymentOption | null = null;

  protected selectOption(option: PaymentOption): void {
    this.selectedOption = option;
    this.switchOption.emit(option);
  }
}
