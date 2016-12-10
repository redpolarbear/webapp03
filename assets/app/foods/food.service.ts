/**
 * Created by mxu on 11/30/2016.
 */
import { Food } from "./food.model";
import {Response, Http, Headers} from "@angular/http";
import {Injectable, EventEmitter} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class FoodService {
    private foods: Food[] = [];
    foodIsEdit = new EventEmitter<Food>();

    constructor(private http: Http) {}

    addFood(food: Food) {
        const body = JSON.stringify(food);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://192.168.33.10:3000/api/foods', body, {headers: headers})
            .map((response: Response) => {
                const data = response.json();
                this.foods.push(this.makeUpFoodData(data));
                return response.json();
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getFood() {
        return this.http.get('http://192.168.33.10:3000/api/foods')
            .map((response: Response) => {
                const foods = response.json();
                let transformedFoods: Food[] = [];
                for (let food of foods) {
                    transformedFoods.push(this.makeUpFoodData(food));
                }
                this.foods = transformedFoods;
                return transformedFoods;
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    deleteFood(food: Food) {
        this.foods.splice(this.foods.indexOf(food), 1);
    }

    editFood(food: Food) {
        this.foodIsEdit.emit(food);
    }

    validDaysLeft(expireDate: string) {
        let todayDate = new Date();
        let expireDateValue = new Date(expireDate);
        let diffTime = expireDateValue.getTime() - todayDate.getTime();

        if (diffTime > 0) {
            let timeDiff = Math.abs(diffTime);
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays > 7) {
                return { validdays: diffDays,
                         status: 'success'};
            } else if (diffDays <=7 && diffDays > 0) {
                return { validdays: diffDays,
                         status: 'warning'};
            }
        } else {
            return { validdays: 0,
                     status: 'danger'};
        }
    }

    makeUpFoodData(foodData: any) {
        foodData.validdays = this.validDaysLeft(foodData.expireDate).validdays;
        foodData.status = this.validDaysLeft(foodData.expireDate).status;
        let transformedFood: Food = new Food(
            foodData.name,
            foodData.description,
            foodData.code,
            foodData.purchaseDate,
            foodData.produceDate,
            foodData.validPeriod,
            foodData.expireDate,
            foodData.validdays,
            foodData.status,
            foodData.createdAt,
            foodData.updatedAt
        );
        return transformedFood;
    }


}
