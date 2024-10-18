import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { inject } from '@angular/core';


export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const authenticationService = inject(AuthenticationService);
    const router = inject(Router);
    
    return authenticationService.ValidateAuthentication().then(
      (isAuthenticated => isAuthenticated? true : router.createUrlTree(['/authentication']))
    );
}
