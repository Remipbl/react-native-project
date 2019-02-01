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
 * @param {{email: string, password: string, username: string}} credentials
 * @return {Observable<boolean>} Observable<boolean>
 * @public
 */
function signup(credentials: Object) {
  return Observable.create(observer => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(res => {
        firebase
          .database()
          .ref(`/users/${res.user.uid}/`)
          .set({
            id: res.user.uid,
            username: credentials.username,
            email: credentials.email,
            image: null,
          })
          .then(() => {
            observer.next(true);
            observer.complete();
          })
          .catch(() => {
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
                id: returnArr.id,
                email: returnArr.email,
                username: returnArr.username,
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
        email: credentials.email,
        username: credentials.username,
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
