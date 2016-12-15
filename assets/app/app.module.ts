import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { FoodComponent } from "./foods/food.component";
import { FoodInputComponent } from "./foods/food-input.component";
import { FoodListComponent } from "./foods/food-list.component";
import {FoodsComponent} from "./foods/foods.component";
import {AuthenticationComponent} from "./auth/authentication.component";
import {HeaderComponent} from "./header.component";
import {routing} from "./app.routing";
import {LogoutComponent} from "./auth/logout.component";
import {SigninComponent} from "./auth/signin.component";
import {SignupComponent} from "./auth/signup.component";
import {FoodUpdateComponent} from "./foods/food-update.component";
import {AuthService} from "./auth/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        FoodComponent,
        FoodInputComponent,
        FoodListComponent,
        FoodsComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        SigninComponent,
        SignupComponent,
        FoodUpdateComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}