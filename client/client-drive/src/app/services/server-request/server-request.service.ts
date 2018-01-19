import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { JwtHelper } from 'angular2-jwt';

import { MessageService } from '../message/message.service';
import { CookieService } from 'ngx-cookie-service';
import { CheckCookieService } from '../check-cookie/check-cookie.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

interface UserResponse {
  response: object;
}

@Injectable()
export class ServerRequestService {

  jwtHelper: JwtHelper  = new JwtHelper();

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private cookieService: CookieService,
    private checkCookieSeervice: CheckCookieService
  ) { }

  sanitizerView(view) {
    return this.sanitizer.bypassSecurityTrustHtml(view);
  }

  getIndexView() {
    return this.http.get('http://localhost:3000', { responseType: 'text' })
      .pipe(
        tap(view => {
            console.log('Login view successfully load!');
          }),
          catchError(this.handleError('getIndexView', ''))
        );
  }

  getUser() {
    const user_id = this.checkCookieSeervice.getUserId();
    console.log(user_id);
    return this.http.get('http://localhost:3000/user/' + user_id)
    .pipe(
      tap(user => {
          console.log(user);
        }),
        catchError(this.handleError('getUser', ''))
    );
  }

  updateUser(body) {
    const user_id = this.checkCookieSeervice.getUserId();
    return this.http.patch('http://localhost:3000/user/' + user_id, body)
    .pipe(
      tap(response => {
        console.log(response);
      }),
      catchError(this.handleError('updateUser', ''))
    );
  }

  checkIfTokenExipered() {
    console.log(this.jwtHelper.isTokenExpired(this.checkCookieSeervice.getUserToken()));
    return this.jwtHelper.isTokenExpired(this.checkCookieSeervice.getUserToken());
  }


  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<String> (operation = 'operation', result?: String) {
  return (error: any): Observable<String> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as String);
  };
}

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.setMessage(message);
  }


}
