import { Component, OnInit } from '@angular/core';
import { ServerRequestService } from '../services/server-request/server-request.service';
import { CheckCookieService } from '../services/check-cookie/check-cookie.service';
import { log } from 'util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  body = {
    'name': 'Angular'
  };

  constructor(
    private serverRequestService: ServerRequestService,
    private checkCookieService: CheckCookieService
  ) { }

  ngOnInit() {
    //this.getUserInformation();
    this.getUserInformation();
    this.showErrorMessage();
  }

  getUserInformation() {
    this.serverRequestService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  updateUserProfile() {
    this.serverRequestService.updateUser(this.body).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  showErrorMessage() {
    this.checkCookieService.checkIfErrorMessageCookieExist();
  }

}
