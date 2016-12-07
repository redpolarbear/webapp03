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
            border-right: 1px solid red;
            border-bottom: 1px solid red;
            border-top: 1px solid red;
        }
        .ng-invalid:not(form):not(.ng-pristine) {
            border-left: 5px solid #a94442; /* red */
        }
    `]
})

export class FoodInputComponent implements OnInit{
    name: string;
    daySelected: boolean = true;

    foodInputForm: FormGroup;

    todayDate: string = new Date().toISOString().slice(0,10);

    constructor(private foodService: FoodService, private fb: FormBuilder) {
    }


    setProperty(inChecked: boolean) {
        this.daySelected = inChecked;
    }
    //
    // buildForm(): void {
    //     this.foodInputForm = this.fb.group({
    //         'name': [this.name, Validators.required],
    //         'description': ['this is the default description'],
    //         'code': ['this is the default code'],
    //         'purchaseDate': [this.todayDate],
    //         'produceDate': [this.todayDate, Validators.required],
    //         'validPeriod' : ['', Validators.required],
    //         'expireDate' : ['', Validators.required]
    //     })
    // }

    ngOnInit(): void {
        // this.buildForm();
        // this.foodInputForm = new FormGroup({
        //     name: new FormControl(null, Validators.required),
        //     description: new FormControl(null),
        //     code: new FormControl(null),
        //     purchaseDate: new FormControl(this.todayDate, Validators.required),
        //     produceDate: new FormControl(this.todayDate, [Validators.required, this.produceDateValidator]),
        //     validPeriod: new FormControl(null, Validators.required),
        //     expireDate: new FormControl(null, Validators.required)
        // });

        this.foodInputForm = this.fb.group({
            'name': [this.name, Validators.required],
            'description': ['this is the default description'],
            'code': ['this is the default code'],
            'purchaseDate': [this.todayDate],
            'produceDate': [this.todayDate, Validators.required],
            'validPeriod' : ['', [Validators.required, Validators.pattern('([1-9][0-9]{0,2}|1000)')]],
            'expireDate' : ['', Validators.required]
        }, {validator: (formGroup: FormGroup) => {
                return this.dateValidator(formGroup);
            }
        });

        // this.foodInputForm.valueChanges.subscribe(function(data) {
        //     let validPeriodInput = data.validPeriod;
        //     let expireDateInput = data.expireDate;
        //     this.expireDateCalculation(validPeriodInput);
        //                 // this.validPeriodCalculation(expireDateInput);
        //
        //
        // });        // this.foodInputForm.controls['dayDateSelect'].valueChanges.subscribe( data => (data === true)
        this.foodInputForm.controls['validPeriod'].valueChanges.subscribe(data => this.expireDateCalculation(data));
        // this.foodInputForm.controls['expireDate'].valueChanges.subscribe(data => this.validPeriodCalculation(data));
    //
    }

    expireDateCalculation(data: number): void {
        console.log(this.daySelected);
        if ( data !== null && data <= 1000 ) {
            let purchaseDateInput = new Date(this.foodInputForm.get('purchaseDate').value);
            let expireDateInput = new Date();
            expireDateInput.setDate(purchaseDateInput.getDate() + data + 1);
            let expireDateValue = new Date(expireDateInput).toISOString().slice(0,10);
            this.foodInputForm.controls['expireDate'].setValue(expireDateValue);
        }
    }

    validPeriodCalculation(data: string): void {
        console.log(this.daySelected);
        let purchaseDateInput = new Date(this.foodInputForm.get('purchaseDate').value);
        let expireDateInput = new Date(data);
        let timeDiff = Math.abs(expireDateInput.getTime() - purchaseDateInput.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        this.foodInputForm.controls['validPeriod'].setValue(diffDays);
    }

    // Date Validator 1) produceDate must be later than purchaseDate 2) expireDate must be later than produceDate
    dateValidator(formGroup: FormGroup) {
        let purchaseDateInput = Date.parse(formGroup.get('purchaseDate').value);
        let produceDateInput = Date.parse(formGroup.get('produceDate').value);
        let expireDateInput = Date.parse(formGroup.get('expireDate').value);
        let purchaseDateValidationResult = {};
        let expireDateValidationResult = {};

        if (purchaseDateInput < produceDateInput) {
            purchaseDateValidationResult = {'produceDateInputInvalid': true};
        }

        if (expireDateInput <= produceDateInput) {
            expireDateValidationResult = {'expireDateInputInvalid': true};
        }

        if (purchaseDateValidationResult === {} && expireDateValidationResult === {}) {
            return null;
        } else {
            return Object.assign(purchaseDateValidationResult, expireDateValidationResult);
        }
    };



    onSubmit(value: any) {
        console.log(value);
        // const food = new Food(
        //     form.value.name,
        //     form.value.description,
        //     form.value.code,
        //     form.value.purchaseDate,
        //     form.value.produceDate,
        //     form.value.validPeriod,
        //     form.value.expireDate
        // );
        // this.foodService.addFood(food);
        this.foodInputForm.reset();
    }


}