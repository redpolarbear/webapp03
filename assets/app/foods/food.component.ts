/**
 * Created by mxu on 11/29/2016.
 */
import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Food} from "./food.model";
import {FoodService} from "./food.service";

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
        .control-label {
            padding-top: 7px;
            margin-bottom: 0px;
            text-align: right;
        }
    `]
})

export class FoodComponent {
    @Input() food: Food;
    @Output() editClicked = new EventEmitter<string>();

    constructor (private foodService: FoodService) {

    }

    onEdit() {
        this.editClicked.emit('a new value');
    };

    onDelete() {
        this.foodService.deleteFood(this.food);
    }

}