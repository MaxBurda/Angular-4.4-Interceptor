import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/do';

@Injectable()
export class Interceptor implements  HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //this.loaderService.show();
    console.log('______________start______________');
    return next.handle(req)
      .do(
        (response) => {
          if (response instanceof HttpResponse) {
            console.log('______________end______________');
            //this.loaderService.hide();
          }
        },
        (error) => {
          console.log('______________end______________');
          //this.loaderService.hide();
        });
  }
}

