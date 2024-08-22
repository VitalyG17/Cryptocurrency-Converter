import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AnswerCryptoGecko} from '../types/cryptoServer-answer';
import {catchError, Observable, of} from 'rxjs';

@Injectable()
export class CryptoService {
  private readonly baseApiUrl: string = 'https://api.coingecko.com/api/v3';

  constructor(private http: HttpClient) {}

  public getCryptoList(): Observable<AnswerCryptoGecko[]> {
    return this.http.get<AnswerCryptoGecko[]>(`${this.baseApiUrl}/coins/markets?vs_currency=usd`).pipe(
      catchError((err: unknown) => {
        console.error('Error!', err);
        return of([]);
      }),
    );
  }
}
