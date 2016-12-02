import { Component } from '@angular/core';

import { Food } from "./foods/food.model";
import { FoodService } from "./foods/food.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [FoodService]
})
export class AppComponent {
    foods: Food[] = [
        new Food('hotpot', 'tasty'),
        new Food('bbq', 'tasty more'),
    ];

}