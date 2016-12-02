/**
 * Created by mxu on 11/29/2016.
 */
import {Component} from "@angular/core";
import {FoodService} from "./food.service";
import {Food} from "./food.model";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'app-food-input',
    templateUrl: './food-input.component.html'
})

export class FoodInputComponent {

    constructor(private foodService: FoodService) {

    }

    onSubmit(form: NgForm) {
        const food = new Food(form.value.name);
        this.foodService.addFood(food);
        form.resetForm();
    }

}