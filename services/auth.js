import React from 'react';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

export class AuthService {
    constructor() {

    }

    signin(credentials) {
        return Observable.create(observer => {
            firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
            .then(() => {
                observer.next(true);
                observer.complete();
            })
            .catch(() => {
                observer.next(false);
                observer.complete();
            });
        });
    }

    signup(credentials) {
        return Observable.create(observer => {
            firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(res => {
                firebase.database().ref('/users/'+res.user.uid+'/').set({
                    id: res.user.uid,
                    username: credentials.username,
                    email: credentials.email
                })
                .then(() => {
                    observer.next(true);
                    observer.complete();
                })
                .catch(err => {
                    observer.next(false);
                    observer.complete();
                });
            })
            .catch(() => {
                observer.next(false);
                observer.complete();
            });
        });
    }
}