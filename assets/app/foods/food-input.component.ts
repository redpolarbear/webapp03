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
    name: string;
    daySelected: boolean = true;

    setProperty(inChecked: boolean) {
        this.daySelected = inChecked;
    }

    constructor(private foodService: FoodService) {

    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        const food = new Food(
            form.value.name,
            form.value.description,
            form.value.code,
            form.value.purchaseDate,
            form.value.produceDate,
            form.value.validPeriod,
            form.value.expireDate
        );
        this.foodService.addFood(food);
        form.resetForm();
    }


}