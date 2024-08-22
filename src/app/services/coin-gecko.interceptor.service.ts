import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CoinGeckoInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiUrl: string = 'https://api.coingecko.com/api/v3';

    if (req.url.startsWith(apiUrl)) {
      const cloneReq: HttpRequest<unknown> = req.clone({
        setHeaders: {
          'x-cg-demo-api-key': 'CG-CwCaM4DTG7Dw8X6Z3bBtUzYr',
        },
      });
      return next.handle(cloneReq);
    }
    return next.handle(req);
  }
}
