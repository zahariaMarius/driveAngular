import { Component, OnInit } from '@angular/core';
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

   user: any;
   showSelected : boolean;
   showEdit: boolean;

  constructor(
    private serverRequestService: ServerRequestService,
    private cookie: CheckCookieService,
    private elementRef:ElementRef
  ) {
      this.showSelected = false;
      this.showEdit = true;
 }


  ngOnInit() {
    this.getUserInformation();
  }

  ngAfterViewInit() {
  this.elementRef.nativeElement.querySelector('#edit')
                                .addEventListener('click', this.onClick.bind(this));

}

onClick(event) {
   this.showSelected = true;
   this.showEdit = false;
}

saveData(name: string, surname: string, email: string, password: string){


}

  getUserInformation() {
    this.serverRequestService.getUser().subscribe(
      user => {
        this.user = user;
      }
    );
  }

}
