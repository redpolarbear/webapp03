
import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';

import {User} from "./user.model";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {


    constructor(private http: Http) {

    }

    signUp(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/users', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    signIn(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/api/users/login', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));
    }

    logOut() {
        localStorage.clear();
        const authToken = localStorage.getItem('auth_token');
        const headers = new Headers({'Content-Type': 'application/json', 'Auth': authToken });
        return this.http.delete('http://localhost:3000/api/users/login', {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()));

    }



}