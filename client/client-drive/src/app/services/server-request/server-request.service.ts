import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

import { MessageService } from '../message/message.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ServerRequestService {

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) { }

  getIndexView() {
    return this.http.get('http://localhost:3000/user/login', { responseType: 'text' })
      .pipe(
        tap(view => {
            console.log('Login view successfully load!');
          }),
          catchError(this.handleError('getIndexView', ''))
        );
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
