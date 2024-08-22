import {Component, Input} from '@angular/core';
import {PaymentOption} from '../../types/paymentOption';

@Component({
  selector: 'app-send-receive',
  templateUrl: './send-receive.component.html',
  styleUrls: ['./send-receive.component.scss'],
})
export class SendReceiveComponent {
  @Input() title: string | null = null;

  @Input() isCrypto: boolean = false;

  public handleSwitch(option: PaymentOption): void {
    this.isCrypto = option === PaymentOption.Crypto;
  }
}
