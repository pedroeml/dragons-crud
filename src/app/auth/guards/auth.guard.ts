import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { UserModel } from '../model/user.model';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly service: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: UserModel = this.service.userValue;

    if (!isNullOrUndefined(user)) {
      return true;
    }

    if (state.url !== '/login') {
      this.router.navigateByUrl('/login');
    }

    return false;
  }
}
