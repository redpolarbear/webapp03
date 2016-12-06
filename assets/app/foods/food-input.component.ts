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
        
        .produce-date-invalid {
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
    // expireDateCtrl = new FormControl();
    // validPeriodCtrl = new FormControl();

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
            'validPeriod' : ['', Validators.required],
            'expireDate' : ['', Validators.required]
        }, {
            validator: (formGroup: FormGroup) => {
                return this.produceDateValidator(formGroup);
            }
        });

        // this.expireDateCtrl.valueChanges.subscribe( data => console.log(data));

    }

    // produceDateValidator(formGroup: FormGroup) {
    produceDateValidator(formGroup: FormGroup) {
        // // for (let key in formGroup.controls) {
        //     if (formGroup.controls.hasOwnProperty('produceDate')) {
        //         // controlName.indexOf('produce') !== -1) {
        //         produceDateInput = Date.parse(formGroup.controls['produceDate'].value);
        //     }
        //     if (formGroup.controls.hasOwnProperty('purchaseDate')) {
        //         purchaseDateInput = Date.parse(formGroup.controls['purchaseDate'].value);
        //     }
        //
        // // }
        let purchaseDateInput = Date.parse(formGroup.controls['purchaseDate'].value);
        let produceDateInput = Date.parse(formGroup.controls['produceDate'].value);
        return (purchaseDateInput >= produceDateInput) ? null : { 'produceDateInputInvalid': true };
        // // return (control: AbstractControl): {[key: string]: any} => {
        //     let produceDateInput = c.value;
        //     let purchaseDateInput = this.todayDate;
        //     // let compareDate = new Date().toISOString().slice(0,10);
        //     return ( Date.parse(produceDateInput) < Date.parse(purchaseDateInput) ) ? {'valid': false} :null;
        // // };
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
    }


}