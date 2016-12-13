/**
 * Created by mxu on 11/29/2016.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Food} from "./food.model";
import {FoodService} from "./food.service";
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-food',
    templateUrl: './food.component.html',
    styles: [`
        .create-date {
            display: inline-block;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            width: 19%;
        }
        .control-label-display {
            padding-top: 7px;
            margin-bottom: 0px;
            text-align: right;
            float: left;
            margin-right: 15px;
        }
        .in-line {
            display: inline-block;
        }
    `]
})

export class FoodComponent {
    @Input() food: Food;

    constructor (private foodService: FoodService) {

    }

    onEdit() {
        console.log(this.food);
        this.foodService.editFood(this.food);
    };

    onDelete() {
        console.log(this.food);
        this.foodService.deleteFood(this.food)
            .subscribe(
                response => console.log(response),
                error => console.error(error)
            );
    }

}