import {Component} from "@angular/core";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
/**
 * Created by mxu on 12/1/2016.
 */

@Component ({
    selector: 'app-logout',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
        </div>
    `
})

export class LogoutComponent {

    constructor(private authService: AuthService, private router: Router) {

    }

    onLogout() {
        this.authService.logOut();
        this.router.navigate(['/auth', 'signin']);
    }

}