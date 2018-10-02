import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService {

    authChange = new Subject<boolean>();
    // private user: User;
    private isAuthenticated = false;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private trainingService: TrainingService) {

    }

    initAuthListener() { // THis one goes to the app.component
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingService.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }
    registerUser(authData: AuthData) {
       /*
       this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.authSuccesfully();
        */
        this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result => {
                console.log(result);
                // this.authSuccesfully();
            })
            .catch(error => {
                console.log(error);
            });
    }

    login(authData: AuthData) {
        /*
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.authSuccesfully();
         */
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email,
            authData.password
            ).then(result => {
                console.log(result);
                // this.authSuccesfully();
            })
            .catch(error => {
                console.log(error);
            });
    }

    logout() {
        this.afAuth.auth.signOut();
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        // this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    /* getUser() {
        // return this.user;
        return { ...this.user }; // To return not the object but only its properties
    } */

    isAuth() {
        // return this.user != null;
        return this.isAuthenticated;
    }

    private authSuccesfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}
