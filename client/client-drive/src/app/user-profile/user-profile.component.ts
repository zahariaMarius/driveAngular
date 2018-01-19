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

  constructor(
    private serverRequestService: ServerRequestService,
    private cookie: CheckCookieService
  ) { }

  ngOnInit() {
    this.getUserInformation();
  }

  getUserInformation() {
    this.serverRequestService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }

}
