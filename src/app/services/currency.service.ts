import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import {AnswerCurrency} from '../types/currencyServer-answer';

@Injectable()
export class CurrencyService {
  private readonly API_KEY: string = '360f4fab6cc51c926b5b8eaf';

  private readonly baseApiUrl: string = 'https://v6.exchangerate-api.com/v6';

  constructor(private http: HttpClient) {}

  public getCurrentExchangeRate(currentCurrency: string): Observable<AnswerCurrency> {
    return this.http.get<AnswerCurrency>(`${this.baseApiUrl}/${this.API_KEY}/latest/${currentCurrency}`).pipe(
      catchError((err: unknown) => {
        console.error('Error!', err);
        return of({} as AnswerCurrency);
      }),
    );
  }
}
