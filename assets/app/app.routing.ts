import {Routes, RouterModule} from "@angular/router";

import {FoodsComponent} from "./foods/foods.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {AUTH_ROUTES} from "./auth/auth.routes";
/**
 * Created by mxu on 12/1/2016.
 */


const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/foods', pathMatch: 'full'},
    { path: 'foods', component: FoodsComponent},
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES}
];

export const routing = RouterModule.forRoot(APP_ROUTES);