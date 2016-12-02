import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";

/**
 * Created by mxu on 12/1/2016.
 */

@Component ({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit{
    signinForm: FormGroup;

    ngOnInit() {
        this.signinForm = new FormGroup({
            email: new FormControl(null,Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        console.log(this.signinForm.value);
        this.signinForm.reset()
    }
}