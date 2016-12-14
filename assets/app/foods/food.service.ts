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
        return this.http.post('http://localhost:3000/api/foods', body, {headers: headers})
            .map((response: Response) => {
                const data = response.json();
                this.foods.push(this.makeUpFoodData(data));
                return {response: response.json(), foods: this.foods};
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    getFood() {
        return this.http.get('http://localhost:3000/api/foods')
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
        console.log('indexOf:' + this.foods.indexOf(food));
        this.foods.splice(this.foods.indexOf(food), 1);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.delete('http://localhost:3000/api/foods/' + food.foodId, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    editFood(food: Food) {
        this.foodIsEdit.emit(food);
    }

    updateFood(food: Food) {
        const body = JSON.stringify(food);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.put('http://localhost:3000/api/foods/' + food.foodId, body, {headers: headers})
            .map((response: Response) => {
                const updatedFood = this.makeUpFoodData(response.json());
                const index = this.findIndexByFoodId(updatedFood.foodId);
                if (index !== -1) {
                    this.foods[index].name = updatedFood.name;
                    this.foods[index].description = updatedFood.description;
                    this.foods[index].code = updatedFood.code;
                    this.foods[index].purchaseDate = updatedFood.purchaseDate;
                    this.foods[index].produceDate = updatedFood.produceDate;
                    this.foods[index].validPeriod = updatedFood.validPeriod;
                    this.foods[index].expireDate = updatedFood.expireDate;
                    this.foods[index].validDaysLeft = updatedFood.validDaysLeft;
                    this.foods[index].status = updatedFood.status;
                    this.foods[index].createdAt = updatedFood.createdAt;
                    this.foods[index].updatedAt = updatedFood.updatedAt;
                    return { message: 'success' };
                }
                return { message: 'failure' };
            })
            .catch((error: Response) => Observable.throw(error.json()));
    }

    validDaysLeft(expireDate: string) {
        let todayDate = new Date();
        let expireDateValue = new Date(expireDate);
        let diffTime = expireDateValue.getTime() - todayDate.getTime();

        if (diffTime > 0) {
            let timeDiff = Math.abs(diffTime);
            let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            if (diffDays > 7) {
                return { validDays: diffDays,
                         status: 'success'};
            } else if (diffDays <=7 && diffDays > 0) {
                return { validDays: diffDays,
                         status: 'warning'};
            }
        } else {
            return { validDays: 0,
                     status: 'danger'};
        }
    }

    makeUpFoodData(foodData: any): Food{
        foodData.validDays = this.validDaysLeft(foodData.expireDate).validDays;
        foodData.status = this.validDaysLeft(foodData.expireDate).status;

        let transformedFood: Food = new Food(
            foodData.name,
            foodData.description,
            foodData.code,
            foodData.purchaseDate,
            foodData.produceDate,
            foodData.validPeriod,
            foodData.expireDate,
            foodData.validDays,
            foodData.status,
            foodData.createdAt,
            foodData.updatedAt,
            foodData.id
        );
        return transformedFood;
    }

    findIndexByFoodId(id: number): number {
        let i = 0;
        for ( i; i < this.foods.length; i++) {
            if ( this.foods[i].foodId == id) {
                return i;
            }
        }
        return -1;
    }



}
