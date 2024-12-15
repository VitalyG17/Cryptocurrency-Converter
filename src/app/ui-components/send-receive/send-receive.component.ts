import {ChangeDetectionStrategy, Component, inject, Input, OnInit} from '@angular/core';
import {PaymentOption} from '../../types/paymentOption';
import {ExchangeService} from '../../services/exchange.service';
import {AnswerCryptoGecko} from '../../types/cryptoServer-answer';
import {BankInfo} from '../../types/bank-info';
import {CryptoService} from '../../services/crypto.service';

@Component({
  selector: 'app-send-receive',
  templateUrl: './send-receive.component.html',
  styleUrls: ['./send-receive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendReceiveComponent implements OnInit {
  @Input() public title: string | null = null;

  @Input() public isCrypto: boolean = false;

  @Input() public isGive: boolean = true;

  public selectedImage: string | null = null;

  public cryptoList: AnswerCryptoGecko[] = [];

  private readonly exchangeService: ExchangeService = inject(ExchangeService);

  private readonly cryptoServiceGecko: CryptoService = inject(CryptoService);

  protected handleSwitch(option: PaymentOption): void {
    this.isCrypto = option === PaymentOption.Crypto;
  }

  protected onItemSelected(item: AnswerCryptoGecko | BankInfo): void {
    const image: string = item.image;

    this.isGive ? this.exchangeService.setGiveValue(item) : this.exchangeService.setReceiveValue(item);
    this.selectedImage = image;
  }

  public ngOnInit(): void {
    this.cryptoServiceGecko.getCryptoList().subscribe((data: AnswerCryptoGecko[]) => {
      this.cryptoList = data;
    });
  }
}
