import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {BankInfo} from '../types/bank-info';
import {AnswerCryptoGecko} from '../types/cryptoServer-answer';

@Injectable()
export class ExchangeService {
  private giveValueSubject: Subject<BankInfo | AnswerCryptoGecko> = new Subject<BankInfo | AnswerCryptoGecko>();
  private receiveValueSubject: Subject<BankInfo | AnswerCryptoGecko> = new Subject<BankInfo | AnswerCryptoGecko>();

  giveValue$: Observable<BankInfo | AnswerCryptoGecko> = this.giveValueSubject;
  receiveValue$: Observable<BankInfo | AnswerCryptoGecko> = this.receiveValueSubject;

  setGiveValue(value: BankInfo | AnswerCryptoGecko) {
    this.giveValueSubject.next(value);
  }

  setReceiveValue(value: BankInfo | AnswerCryptoGecko) {
    this.receiveValueSubject.next(value);
  }
}
