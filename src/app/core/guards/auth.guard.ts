import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../services/shared.service';

@Injectable()
export class AuthGuard implements CanActivate {

    public constructor(
        private router: Router,
        private sharedService: SharedService
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!this.sharedService.isLoggedIn()) {
            this.sharedService.removeUserSession();
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }

}
