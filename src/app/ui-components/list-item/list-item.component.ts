import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from 'rxjs';
import {AnswerCryptoGecko} from '../../types/cryptoServer-answer';
import {banksInformation} from '../../banksInformation';
import {BankInfo} from '../../types/bank-info';
import {CryptoService} from '../../services/crypto.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  @Input() isCrypto: boolean = true;

  protected cryptoList: AnswerCryptoGecko[] = [];

  protected readonly banksInformation: BankInfo[] = banksInformation;

  private destroy$: Subject<void> = new Subject<void>();

  private readonly cryptoServiceGecko: CryptoService = inject(CryptoService);

  public ngOnInit(): void {
    this.cryptoServiceGecko
      .getCryptoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: AnswerCryptoGecko[]) => {
        this.cryptoList = data;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
