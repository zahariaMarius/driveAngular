import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServerRequestService } from '../server-request/server-request.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private serverRequestService: ServerRequestService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.serverRequestService.checkIfTokenExipered()) {
      this.router.navigate(['/login']);
    } else {
      return true;
    }
  }

}
