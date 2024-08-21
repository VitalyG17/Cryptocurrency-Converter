import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {HttpService} from '../../services/http.service';
import {Subject, takeUntil} from 'rxjs';
import {AnswerCrypto} from '../../types/server-answer';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit, OnDestroy {
  protected cryptoList: AnswerCrypto[] = [];

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
