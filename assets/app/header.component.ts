import {Component} from "@angular/core";
/**
 * Created by mxu on 12/1/2016.
 */

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                    <li routerLinkActive="active"><a [routerLink]="['/foods']">Foods</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/auth']" >Authentication</a></li>
                </ul>
            </nav>
        </header>
    `
})

export class HeaderComponent {

}
