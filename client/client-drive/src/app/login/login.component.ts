import { Component, OnInit } from '@angular/core';
import { ServerRequestService } from '../services/server-request/server-request.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private serverRequest: ServerRequestService
  ) { }

  ngOnInit() {
  }

}
