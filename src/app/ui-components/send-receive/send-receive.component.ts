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
  @Input() public title: string | null = null;

  @Input() public isCrypto: boolean = false;

  @Input() public isGive: boolean = true;

  public selectedImage: string | null = null;

  private readonly exchangeService: ExchangeService = inject(ExchangeService);

  protected handleSwitch(option: PaymentOption): void {
    this.isCrypto = option === PaymentOption.Crypto;
  }

  protected onItemSelected(item: AnswerCryptoGecko | BankInfo): void {
    const image: string = item.image;

    this.isGive ? this.exchangeService.setGiveValue(item) : this.exchangeService.setReceiveValue(item);
    this.selectedImage = image;
  }
}
