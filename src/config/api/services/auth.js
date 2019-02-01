// @flow
import React from 'react';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

import { User } from '../models/user';

/**
 * Sign In firebase method with Email and Password
 *
 * @param {{email: string, password: string}} credentials
 * @return {Observable<boolean>} Observable<boolean>
 * @public
 */
function signin(credentials: Object) {
  return Observable.create(observer => {
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
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

/**
 * Sign Up firebase method with Email and Password
 *
 * @param {{email: string, password: string, f_name: string, l_name: string, age: number, gender: string, nationality: string, image: any}} credentials
 * @return {Observable<boolean>} Observable<boolean>
 * @public
 */
function signup(credentials: Object) {
  return Observable.create(observer => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        console.log(credentials);
        firebase
          .database()
          .ref(`/users/${res.user.uid}/`)
          .set({
            id: res.user.uid,
            f_name: credentials.f_name,
            l_name: credentials.l_name,
            email: credentials.email,
            age: credentials.age,
            nationality: credentials.nationality,
            image: null,
          })
          .then(() => {
            observer.next(res.user.uid);
            observer.complete();
          })
          .catch(() => {
            observer.next(null);
            observer.complete();
          });
      })
      .catch(() => {
        observer.next(null);
        observer.complete();
      });
  });
}

/**
 * Get connected user information from database.
 *
 * @return {Observable<{id: string, email: string, username: string}>} Observale<{id: string, email: string, username: string}>
 * @public
 */
function getUserInformations() {
  return Observable.create(observer => {
    firebase.auth().onAuthStateChanged(
      user => {
        if (user != null) {
          firebase
            .database()
            .ref(`/users/${user.uid}/`)
            .on('value', resp => {
              returnArr = {};
              resp.forEach(childSnapshot => {
                returnArr[childSnapshot.key] = childSnapshot.val();
              });
              observer.next({
                id: returnArr.uid,
                f_name: returnArr.f_name,
                l_name: returnArr.l_name,
                email: returnArr.email,
                age: returnArr.age,
                nationality: returnArr.nationality,
                image: returnArr.image,
              });
              observer.complete();
            });
        } else {
          observer.next(null);
          observer.complete();
        }
      },
      () => {
        observer.next(null);
        observer.complete();
      }
    );
  });
}

/**
 * Update user
 *
 * @param {{id: string, email: string, username: username, image: string}} credentials
 * @return {Observable<boolean>} Observable<boolean>
 * @public
 */
function updateUser(credentials: Object) {
  return Observable.create(observer => {
    firebase
      .database()
      .ref(`/users/${credentials.id}/`)
      .update({
        id: credentials.id,
        f_name: credentials.f_name,
        l_name: credentials.l_name,
        email: credentials.email,
        age: credentials.age,
        nationality: credentials.nationality,
        image: credentials.image,
      })
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

export default {
  signin,
  signup,
  getUserInformations,
  updateUser,
};
