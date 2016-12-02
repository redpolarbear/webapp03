import {Component} from "@angular/core";
/**
 * Created by mxu on 12/1/2016.
 */

@Component({
    selector: 'app-foods',
    template: `
        <div class="row">
            <app-food-input></app-food-input>
        </div>
        <hr>
        <div class="row">
            <app-food-list></app-food-list>
        </div>
    `
})

export class FoodsComponent {

}