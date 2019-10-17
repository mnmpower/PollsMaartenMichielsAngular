import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Injectable()
export class NeedAuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const redirectUrl = route['_routerState']['url'];
    if (this.authenticationService.isLogged()) {
      return true;
    }

    this.router.navigateByUrl(
      this.router.createUrlTree(
        [''], {
          queryParams: {
            redirectUrl
          }
        }
      )
    );

    return false;
  }
}
