import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) {

    }
    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.authSuccesfully();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.authSuccesfully();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        // return this.user;
        return { ...this.user }; // To return not the object but only its properties
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccesfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}