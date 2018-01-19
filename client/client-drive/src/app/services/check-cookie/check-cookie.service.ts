import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../message/message.service';
import { JwtHelper } from 'angular2-jwt';

@Injectable()
export class CheckCookieService {

  jwtHelper: JwtHelper = new JwtHelper();
  token = this.cookieService.get('userToken');

  constructor(
    private cookieService: CookieService,
    private messageService: MessageService
  ) { }

  checkIfErrorMessageCookieExist() {
    if (this.cookieService.check('errorMessage')) {
      this.messageService.setMessage(this.cookieService.get('errorMessage'));
    }
  }

  getUserId() {
    const decodedToken = this.jwtHelper.decodeToken(this.token);
    return decodedToken._id;
  }

  getUserToken() {
    return this.token;
  }

}
