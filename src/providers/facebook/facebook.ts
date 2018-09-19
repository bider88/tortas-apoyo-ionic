import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { Platform } from 'ionic-angular';

// import { AlertController } from 'ionic-angular';

import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class FacebookProvider {

  constructor(
    // private alertCtrl: AlertController,
    private fb: Facebook,
    private platform: Platform,
    private afAuth: AngularFireAuth
  ) {
    console.log('Hello FacebookProvider Provider');
  }

  signInWithFacebook() {

    return new Promise ( ( resolve, reject ) => {
      if (this.platform.is('cordova')) {


        this.fb.login([ 'email', 'public_profile' ]).then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

          console.log('Getting data..............');

          firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then( ( res: any ) => {

            resolve( res );

          })
          .catch( err => {
            reject( err );
            console.log( JSON.stringify( err ) );
          });

        })
        .catch( err => {
          reject( err );
          console.log( JSON.stringify( err ) );
        });

      } else {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then( ( res: any ) => {
          resolve( res );
        })
        .catch( err => {
          reject( err );
          console.log( JSON.stringify( err ) );
        });
      }

    });

  }

}
