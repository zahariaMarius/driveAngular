import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../message/message.service';

@Injectable()
export class CheckCookieService {

  constructor(
    private cookieService: CookieService,
    private messageService: MessageService
  ) { }

  checkIfErrorMessageCookieExist() {
    if (this.cookieService.check('errorMessage')) {
      this.messageService.setMessage(this.cookieService.get('errorMessage'));
    }
  }

}
