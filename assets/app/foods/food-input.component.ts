/**
 * Created by mxu on 11/29/2016.
 */
import {Component, OnInit} from "@angular/core";
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn} from "@angular/forms";


import {FoodService} from "./food.service";
import {Food} from "./food.model";

@Component({
    selector: 'app-food-input',
    templateUrl: './food-input.component.html',
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

export class FoodInputComponent implements OnInit{
    foodInputForm: FormGroup;
    name: string; // name of the food
    daySelected: boolean = true; // valid period radio input checked = true
    todayDate: string = new Date().toISOString().slice(0,10);

    constructor(private foodService: FoodService, private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.foodInputForm = this.fb.group({
            'name': [this.name, Validators.required],
            'description': [''],
            'code': [''],
            'purchaseDate': [this.todayDate],
            'produceDate': [this.todayDate, Validators.required],
            'validPeriod' : [null, [Validators.required, Validators.pattern('([1-9][0-9]{0,2}|1000)')]],
            'expireDate' : ['', Validators.required]
        }, {validator: (formGroup: FormGroup) => {
                return this.dateValidator(formGroup);
            }
        });
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
        const food = new Food(data.name, data.description, data.code, data.purchaseDate, data.produceDate, data.validPeriod, data.expireDate);
        this.foodService.addFood(food)
            .subscribe(
                data => console.log(data),
                error => console.error(error)
            );
        this.foodInputForm.reset({name: '', purchaseDate: this.todayDate, produceDate: this.todayDate});
    }

    // the switch variable to tell whether the valid period radio input is selected (true) or the expire date radio input is selected (false)
    setProperty(inChecked: boolean) {
        this.daySelected = inChecked;
    }

    // Reset the form
    resetForm() {
        this.foodInputForm.reset({name: '', purchaseDate: this.todayDate, produceDate: this.todayDate});
    }

    // Refresh the valid period and expire date calculation when produce date changed
    produceDateInputRefresh(data: string): void {
        // if dayselected = true && valid period field valid && !this.foodInputForm.errors, re-calculate expire date
        if ( true === this.daySelected && this.foodInputForm.controls['validPeriod'].valid && !this.foodInputForm.errors ) {
            this.expireDateCalculation(this.foodInputForm.controls['validPeriod'].value, data);
        }

        // if dayselected = false && expire date field valid && !this.foodInputForm.errors, re-calculate valid period
        if ( false === this.daySelected && this.foodInputForm.controls['expireDate'].valid && !this.foodInputForm.errors ) {
            this.validPeriodCalculation(this.foodInputForm.controls['expireDate'].value, data);
        }

        // othersie do nothing
    }

    // Calculate the expire date with the produce date and the valid period(days).
    expireDateCalculation(data: string, produceDateValue: string): void {
        // check if the valid period radio input is selected and if the produce date has the value.
        if ( true === this.daySelected ) {
            let validPeriodInput = parseInt(data);
            // check if the valid period input is valid
            if (this.foodInputForm.controls['validPeriod'].valid && !this.foodInputForm.errors) {
                let expireDateInput = new Date(produceDateValue);
                expireDateInput.setDate(expireDateInput.getDate() + validPeriodInput);
                let expireDateValue = new Date(expireDateInput).toISOString().slice(0, 10);
                // formular: expire date = produce date + valid period
                this.foodInputForm.controls['expireDate'].setValue(expireDateValue);
            }
        }
    }

    // Calculate the valid period (days) with the produce date and the expire date
    validPeriodCalculation(data: string, produceDateValue: string): void {
        //check if the valid period radio input is NOT selected
        if (false === this.daySelected) {
            // check if the expire date input is valid and if the foodInputForm has the errors
            if (this.foodInputForm.controls['expireDate'].valid && !this.foodInputForm.errors) {
                let produceDateInput = new Date(produceDateValue);
                let expireDateInput = new Date(data);
                let timeDiff = Math.abs(expireDateInput.getTime() - produceDateInput.getTime());
                let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                // formular: valid period = expire date - produce date
                this.foodInputForm.controls['validPeriod'].setValue(diffDays);
            }
        }
    }

}