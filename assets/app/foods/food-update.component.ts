/**
 * Created by mxu on 11/29/2016.
 */
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


import { FoodService } from "./food.service";
import { Food } from "./food.model";

@Component({
    selector: 'app-food-update',
    templateUrl: './food-update.component.html',
    styles: [`
        /*.ng-valid[required], .ng-valid.required {*/
          /*border-left: 5px solid #42A948; !* green *!*/
        /*}*/
        
        .data-invalid {
            border-left: 5px solid #a94442; /* red */
        }
        
        .ng-invalid:not(form):not(.ng-pristine) {
            border-left: 5px solid #a94442; /* red */
        }
    `]
})

export class FoodUpdateComponent implements OnInit {
    foodUpdateForm: FormGroup;
    name: string; // name of the food
    daySelected: boolean = true; // valid period radio input checked = true
    todayDate: string = new Date().toISOString().slice(0,10);
    food: Food;

    constructor(private foodService: FoodService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.foodUpdateForm = this.fb.group({
            'name': [this.name, Validators.required],
            'description': [''],
            'code': [''],
            'purchaseDate': [this.todayDate],
            'produceDate': [this.todayDate, Validators.required],
            'validPeriod' : [null, [Validators.required, Validators.pattern('([1-9][0-9]{0,2}|1000)')]],
            'expireDate' : ['', Validators.required]
        }, { validator: (formGroup: FormGroup) => {
            return this.dateValidator(formGroup);
        }
        });

        this.foodService.foodIsEdit.subscribe(
            (food: Food) => {
                this.food = food;
                this.foodUpdateForm = this.fb.group(food);
            }
        )
    }

    // Date Validator 1) produceDate must be later than purchaseDate 2) expireDate must be later than produceDate
    dateValidator(formGroup: FormGroup) {
        let purchaseDateInput = Date.parse(formGroup.get('purchaseDate').value);
        let produceDateInput = Date.parse(formGroup.get('produceDate').value);
        let expireDateInput = Date.parse(formGroup.get('expireDate').value);
        let purchaseDateValidationResult = {};
        let expireDateValidationResult = {};
        // 1) produceDate must be later than purchaseDate
        if (purchaseDateInput < produceDateInput) {
            purchaseDateValidationResult = {'produceDateInputInvalid': true};
        }
        // 2) expireDate must be later than produceDate
        if (expireDateInput <= produceDateInput) {
            expireDateValidationResult = {'expireDateInputInvalid': true};
        }
        // if valid return null, if not, return the object.
        if (purchaseDateValidationResult === {} && expireDateValidationResult === {}) {
            return null;
        } else {
            return Object.assign(purchaseDateValidationResult, expireDateValidationResult);
        }
    };

    onSubmit(data: any) {
        // this.food = data;
        this.foodService.updateFood(data)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        // this.food = null;
        this.foodUpdateForm.reset();
    }

    // the switch variable to tell whether the valid period radio input is selected (true) or the expire date radio input is selected (false)
    setProperty(inChecked: boolean) {
        this.daySelected = inChecked;
    }

    // Refresh the valid period and expire date calculation when produce date changed
    produceDateInputRefresh(data: string): void {
        // if dayselected = true && valid period field valid && !this.foodInputForm.errors, re-calculate expire date
        if ( true === this.daySelected && this.foodUpdateForm.controls['validPeriod'].valid && !this.foodUpdateForm.errors ) {
            this.expireDateCalculation(this.foodUpdateForm.controls['validPeriod'].value, data);
        }

        // if dayselected = false && expire date field valid && !this.foodInputForm.errors, re-calculate valid period
        if ( false === this.daySelected && this.foodUpdateForm.controls['expireDate'].valid && !this.foodUpdateForm.errors ) {
            this.validPeriodCalculation(this.foodUpdateForm.controls['expireDate'].value, data);
        }

        // otherwise do nothing
    }

    // Calculate the expire date with the produce date and the valid period(days).
    expireDateCalculation(data: string, produceDateValue: string): void {
        // check if the valid period radio input is selected and if the produce date has the value.
        if ( true === this.daySelected ) {
            let validPeriodInput = parseInt(data);
            // check if the valid period input is valid
            if (this.foodUpdateForm.controls['validPeriod'].valid && !this.foodUpdateForm.errors) {
                let expireDateInput = new Date(produceDateValue);
                expireDateInput.setDate(expireDateInput.getDate() + validPeriodInput);
                let expireDateValue = new Date(expireDateInput).toISOString().slice(0, 10);
                // formular: expire date = produce date + valid period
                this.foodUpdateForm.controls['expireDate'].setValue(expireDateValue);
            }
        }
    }

    // Calculate the valid period (days) with the produce date and the expire date
    validPeriodCalculation(data: string, produceDateValue: string): void {
        //check if the valid period radio input is NOT selected
        if (false === this.daySelected) {
            // check if the expire date input is valid and if the foodInputForm has the errors
            if (this.foodUpdateForm.controls['expireDate'].valid && !this.foodUpdateForm.errors) {
                let produceDateInput = new Date(produceDateValue);
                let expireDateInput = new Date(data);
                let timeDiff = Math.abs(expireDateInput.getTime() - produceDateInput.getTime());
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                // formular: valid period = expire date - produce date
                this.foodUpdateForm.controls['validPeriod'].setValue(diffDays);
            }
        }
    }

}