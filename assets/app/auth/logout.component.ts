import {Component} from "@angular/core";
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

    onLogout() {

    }

}