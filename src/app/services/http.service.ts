import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';
import {AnswerCrypto, CryptoApiResponse} from '../types/cryptoServer-answer';

@Injectable()
export class HttpService {
  private readonly baseApiUrl: string = 'https://api.coincap.io/v2';

  constructor(private readonly http: HttpClient) {}

  public getCryptoList(): Observable<AnswerCrypto[]> {
    return this.http.get<CryptoApiResponse>(this.baseApiUrl + '/assets').pipe(
      catchError((err: unknown) => {
        console.error('Error!', err);
        return of({data: [] as AnswerCrypto[], timestamp: 0});
      }),
      map((response: CryptoApiResponse) => response.data),
    );
  }
}
