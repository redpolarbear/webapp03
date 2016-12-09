/**
 * Created by mxu on 11/30/2016.
 */
import { Food } from "./food.model";
import {Response, Http, Headers} from "@angular/http";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs";

@Injectable()
export class FoodService {
    private foods: Food[] = [];

    constructor(private http: Http) {}

    addFood(food: Food) {
        this.foods.push(food);
        const body = JSON.stringify(food);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://192.168.33.10:3000/api/foods', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));

    }

    getFood() {
        return this.foods;
    }

    deleteFood(food: Food) {
        this.foods.splice(this.foods.indexOf(food), 1);
    }

}
