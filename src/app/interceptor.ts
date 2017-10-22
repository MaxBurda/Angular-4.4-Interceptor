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
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Injectable()

export class Interceptor implements HttpInterceptor {

  constructor(private _loadingBar: SlimLoadingBarService) {
  }

  i: number = 0;
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.i += 1;
    this._loadingBar.start();
    return next.handle(req)
      .do(
        (response) => {
          if (response instanceof HttpResponse) {
            this.i -= 1;
            if (this.i == 0) {
              console.log('END');
              this._loadingBar.complete();
            }
          }
        },
        (error) => {
          this.i -= 1;
          console.log(error);
          this._loadingBar.complete();
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

