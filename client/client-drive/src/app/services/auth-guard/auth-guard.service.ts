import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/interfaces';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

  }

}
