import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {BankInfo} from '../types/bank-info';
import {AnswerCryptoGecko} from '../types/cryptoServer-answer';

@Injectable()
export class ExchangeService {
  private giveValueSubject: Subject<BankInfo | AnswerCryptoGecko> = new Subject<BankInfo | AnswerCryptoGecko>();
  private receiveValueSubject: Subject<BankInfo | AnswerCryptoGecko> = new Subject<BankInfo | AnswerCryptoGecko>();

  public giveValue$: Observable<BankInfo | AnswerCryptoGecko> = this.giveValueSubject;
  public receiveValue$: Observable<BankInfo | AnswerCryptoGecko> = this.receiveValueSubject;

  public selectedCurrency: BehaviorSubject<string> = new BehaviorSubject<string>('RUB');
  public selectedCurrencyRate: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public setGiveValue(value: BankInfo | AnswerCryptoGecko): void {
    this.giveValueSubject.next(value);
  }

  public setReceiveValue(value: BankInfo | AnswerCryptoGecko): void {
    this.receiveValueSubject.next(value);
  }

  public updateCurrency(currency: string, rate: number): void {
    this.selectedCurrency.next(currency);
    this.selectedCurrencyRate.next(rate);
  }
}
