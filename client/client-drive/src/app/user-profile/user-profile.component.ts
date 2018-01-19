import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ServerRequestService } from '../services/server-request/server-request.service';
import { CheckCookieService } from '../services/check-cookie/check-cookie.service';
import { log } from 'util';
import { AfterViewInit, ElementRef} from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    showSelected: boolean;
    showEdit: boolean;
    user: any;
    body: {};

  constructor(
    private router: Router,
    private serverRequestService: ServerRequestService,
    private checkCookieService: CheckCookieService,
    private elementRef: ElementRef
  ) {
      this.showSelected = false;
      this.showEdit = true;
 }




  ngOnInit() {
    //this.getUserInformation();
    this.getUserInformation();
    this.showErrorMessage();
  }

  ngAfterViewInit() {
  this.elementRef.nativeElement.querySelector('#edit')
                                .addEventListener('click', this.onClick.bind(this));

}

onClick(event) {
   this.showSelected = true;
   this.showEdit = false;
}

saveData(Name: string, Surname: string, Email: string, Password: string) {

      this.body = {
      'name': Name,
      'surname': Surname,
      'email': Email,
      'password': Password
      };

      this.updateUserProfile(this.body);
      this.getUserInformation();

      this.showSelected = false;
      this.showEdit = true;

       window.location.reload();

}
logOut()
{
    //funzione di logout
}
  getUserInformation() {
    this.serverRequestService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }

  updateUserProfile(body) {
    this.serverRequestService.updateUser(this.body).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  userLogout() {
    this.checkCookieService.deleteUserToken();
    this.router.navigate(['/login']);
  }

  showErrorMessage() {
    this.checkCookieService.checkIfErrorMessageCookieExist();
  }
}
