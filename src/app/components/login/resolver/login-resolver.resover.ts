import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { SharedService } from 'src/app/core/services/shared.service';

@Injectable()
export class LoginResolver implements Resolve<void> {

    constructor(
        private sharedService: SharedService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot): void {
        if (this.sharedService.isLoggedIn()) {
            this.router.navigate(['/home']);
        }
    }

}
