import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class ApiKeyInterceptorService implements HttpInterceptor {
  private readonly API_KEY: string = '5f0d19af-dfa9-4d9b-91c4-b032957cb255';

  public intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const newReq: HttpRequest<unknown> = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.API_KEY}`,
      },
    });
    return next.handle(newReq);
  }
}
