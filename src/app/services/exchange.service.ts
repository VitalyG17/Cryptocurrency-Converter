import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BankInfo} from '../types/bank-info';
import {AnswerCryptoGecko} from '../types/cryptoServer-answer';

@Injectable()
export class ExchangeService {
  private giveValueSubject: BehaviorSubject<BankInfo | AnswerCryptoGecko | null> = new BehaviorSubject<
    BankInfo | AnswerCryptoGecko | null
  >(null);
  private receiveValueSubject: BehaviorSubject<BankInfo | AnswerCryptoGecko | null> = new BehaviorSubject<
    BankInfo | AnswerCryptoGecko | null
  >(null);

  public giveValue$: Observable<BankInfo | AnswerCryptoGecko | null> = this.giveValueSubject;
  public receiveValue$: Observable<BankInfo | AnswerCryptoGecko | null> = this.receiveValueSubject;

  public selectedGiveCurrency: BehaviorSubject<string> = new BehaviorSubject<string>('RUB');
  public selectedReceiveCurrency: BehaviorSubject<string> = new BehaviorSubject<string>('RUB');

  public selectedGiveCurrencyRate: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public selectedReceiveCurrencyRate: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  public setGiveValue(value: BankInfo | AnswerCryptoGecko): void {
    this.giveValueSubject.next(value);
  }

  public setReceiveValue(value: BankInfo | AnswerCryptoGecko): void {
    this.receiveValueSubject.next(value);
  }

  public updateGiveCurrency(currency: string, rate: number): void {
    this.selectedGiveCurrency.next(currency);
    this.selectedGiveCurrencyRate.next(rate);
  }

  public updateReceiveCurrency(currency: string, rate: number): void {
    this.selectedReceiveCurrency.next(currency);
    this.selectedReceiveCurrencyRate.next(rate);
  }
}
