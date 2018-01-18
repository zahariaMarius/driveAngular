import { Component, OnInit } from '@angular/core';
import { ServerRequestService } from '../services/server-request/server-request.service';
import { CheckCookieService } from '../services/check-cookie/check-cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  view: any;

  constructor (
    private serverRequest: ServerRequestService,
    private checkCookieService: CheckCookieService
  ) { }

  ngOnInit() {
    this.getView();
    this.showErrorMessage();
  }

  getView() {
    this.serverRequest.getIndexView().subscribe(
      view => {
        this.view = this.serverRequest.sanitizerView(view);
      }
    );
  }

  showErrorMessage() {
    this.checkCookieService.checkIfErrorMessageCookieExist();
  }

}
