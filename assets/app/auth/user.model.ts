/**
 * Created by mxu on 11/29/2016.
 */
export class User {
    name: string;
    email: string;
    password: string;

    constructor(public name: string,
                public email: string,
                public password: string){

        this.name = name;
        this.email = email;
        this.password = password;
    }
}