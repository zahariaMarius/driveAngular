import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { CheckCookieService } from '../check-cookie/check-cookie.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor (
    private checkCookieService: CheckCookieService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('intercepted request ... ');

    const userToken = this.checkCookieService.getUserToken();

 
    const authReq = req.clone({ headers: req.headers.set( 'Content-Type' , 'application/x-www-form-urlencoded; charset=UTF-8' )});

    console.log('Sending request with new header now ...');
    console.log(authReq.headers);

    return next.handle(authReq).catch((error, caught) => {
      console.log('Error Occurred');
      console.log(error);
      return Observable.throw(error);
    }) as any;
  }

}
