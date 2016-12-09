import {Component, OnInit} from "@angular/core";
import {Food} from "./food.model";
import {FoodService} from "./food.service";
/**
 * Created by mxu on 11/29/2016.
 */
@Component({
    selector: 'app-food-list',
    templateUrl: './food-list.component.html'
})

export class FoodListComponent implements OnInit {
    foods: Food[] = [];

    constructor(private foodService: FoodService) {

    };

    ngOnInit() {
        this.foodService.getFood()
            .subscribe(
                (foods: Food[]) => {
                    this.foods = foods;
                }
            );
    }


}