import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BankInfo} from '../../../types/bank-info';
import {AnswerCryptoGecko} from '../../../types/cryptoServer-answer';
import {Subject, takeUntil} from 'rxjs';
import {CryptoService} from '../../../services/crypto.service';
import {banksInformation} from '../../../banksInformation';

@Component({
  selector: 'app-list-item-business',
  templateUrl: './list-item-business.component.html',
  styleUrls: ['./list-item-business.component.scss'],
})
export class ListItemBusinessComponent implements OnInit, OnDestroy {
  @Input() public isCrypto: boolean = true;

  @Output() public itemSelected: EventEmitter<BankInfo | AnswerCryptoGecko> = new EventEmitter<
    BankInfo | AnswerCryptoGecko
  >();

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

  protected onItemSelected(item: BankInfo | AnswerCryptoGecko): void {
    this.itemSelected.emit(item);
  }
}
