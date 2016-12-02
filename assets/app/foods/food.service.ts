/**
 * Created by mxu on 11/30/2016.
 */
import {Food} from "./food.model";

export class FoodService {
    private foods: Food[] = [];

    addFood(food: Food) {
        this.foods.push(food);
        console.log(this.foods);
    }

    getFood() {
        return this.foods;
    }

    deleteFood(food: Food) {
        this.foods.splice(this.foods.indexOf(food), 1);
    }

}
