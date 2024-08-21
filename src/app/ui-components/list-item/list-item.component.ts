import {Component, inject, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Subject, takeUntil} from 'rxjs';
import {AnswerCrypto} from '../../types/cryptoServer-answer';
import {banksInformation} from '../../banksInformation';
import {BankInfo} from '../../types/bank-info';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  @Input() isCrypto: boolean = true;

  protected cryptoList: AnswerCrypto[] = [];

  protected readonly banksInformation: BankInfo[] = banksInformation;

  private destroy$: Subject<void> = new Subject<void>();

  private readonly cryptoService: HttpService = inject(HttpService);

  public ngOnInit(): void {
    this.cryptoService
      .getCryptoList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: AnswerCrypto[]) => (this.cryptoList = data));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
