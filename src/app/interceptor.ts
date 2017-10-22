import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/do";
import "rxjs/add/operator/catch";

@Injectable()

export class Interceptor implements HttpInterceptor {
  i: number = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.i += 1;
    return next.handle(req)
      .do(
        (response) => {
          if (response instanceof HttpResponse) {
            this.i -= 1;
            if (this.i == 0) {
              console.log('END');
            }
          }
        },
        (error) => {
          this.i -= 1;
          console.log(error);
        }
      )
      .catch(err => {
        if (err instanceof HttpErrorResponse) {
          console.log('Processing http error', err);
        }
        return Observable.throw(err);
      });
  }
}

