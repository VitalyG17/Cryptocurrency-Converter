import {Component, inject, Input} from '@angular/core';
import {PaymentOption} from '../../types/paymentOption';
import {ExchangeService} from '../../services/exchange.service';
import {AnswerCryptoGecko} from '../../types/cryptoServer-answer';
import {BankInfo} from '../../types/bank-info';

@Component({
  selector: 'app-send-receive',
  templateUrl: './send-receive.component.html',
  styleUrls: ['./send-receive.component.scss'],
})
export class SendReceiveComponent {
  @Input() title: string | null = null;

  @Input() isCrypto: boolean = false;

  @Input() isGive: boolean = true;

  public selectedImage: string | null = null;

  private readonly exchangeService: ExchangeService = inject(ExchangeService);

  public handleSwitch(option: PaymentOption): void {
    this.isCrypto = option === PaymentOption.Crypto;
  }

  public onItemSelected(item: AnswerCryptoGecko | BankInfo): void {
    const image = item.image;

    if (this.isGive) {
      this.exchangeService.setGiveValue(item);
    } else {
      this.exchangeService.setReceiveValue(item);
    }
    this.selectedImage = image;
  }
}
