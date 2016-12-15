import {Component, OnInit} from "@angular/core";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {AuthService} from "./auth.service";
import {User} from "./user.model";
import {Router} from "@angular/router";

/**
 * Created by mxu on 12/1/2016.
 */

@Component ({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit {
    signInForm: FormGroup;

    constructor(private authService: AuthService, private route: Router) {}

    ngOnInit() {
        this.signInForm = new FormGroup({
            email: new FormControl(null,Validators.required),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit() {
        const user = new User(this.signInForm.value.email, this.signInForm.value.password);
        this.authService.signIn(user)
            .subscribe(
                data => {
                    localStorage.setItem('auth_token', data.token);

                    console.log(data);
                    this.route.navigateByUrl('/');
                },
                error => console.error(error)
            );
        this.signInForm.reset()
    }
}