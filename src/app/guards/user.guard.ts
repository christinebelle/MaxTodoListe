import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { DataloginService } from '../service/datalogin.service';

@Injectable()
export class UserGuard implements CanActivate {

  constructor(private router: Router, private loginService: DataloginService) {}

  public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
    if (!this.loginService.loggedIn) {
      this.router.navigate(['login']);
      return false;
    } else if (this.loginService.userRoles.getValue().includes('ROLE_USER')) {
      return true;
    }
    return false;
  }
}
