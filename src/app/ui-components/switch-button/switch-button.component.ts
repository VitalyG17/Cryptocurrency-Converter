import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaymentOption} from '../../types/paymentOption';

@Component({
  selector: 'app-switch-button',
  templateUrl: './switch-button.component.html',
  styleUrls: ['./switch-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchButtonComponent implements OnInit {
  @Input() public isCrypto: boolean = true;

  @Output() public switchOption: EventEmitter<PaymentOption> = new EventEmitter<PaymentOption>();

  protected readonly PaymentOption = PaymentOption;

  protected selectedOption: PaymentOption | null = null;

  public ngOnInit(): void {
    this.selectedOption = this.isCrypto ? PaymentOption.Crypto : PaymentOption.Currency;
  }

  protected selectOption(option: PaymentOption): void {
    this.selectedOption = option;
    this.switchOption.emit(option);
  }
}
