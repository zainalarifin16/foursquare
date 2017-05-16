/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
// import { TabsPage } from '../tabs/tabs';
import { MyApp } from '../../app/app.component';

//angular form
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

import * as Promise from 'Promise';

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
  users           : FirebaseListObservable< any[] >;
  error           : any;
  af              : any;
  loginForm       : FormGroup;
  //form sign up
  public full_name        : string;
  public date_of_birth    : string;
  public email            : string;
  public confirm_email    : string;
  //user account
  public username         : string;
  public password         : string;
  public confirm_password : string;

  constructor(  public navCtrl: NavController, 
                public alertCtrl: AlertController, 
                af: AngularFire, 
                builder: FormBuilder,
                public _params: NavParams) {
    this.af      = af;
    // this.af = _params.get("af");
    this.loginForm = builder.group({
            'email': [
                '', // default value
                [Validators.required, Validators.minLength(5)]
            ],
            'password': [
                '',
                [Validators.required, Validators.minLength(5)]
            ]
        })
  }

  firstsign = true;
  signin    = false;
  signup    = false;

  menuLoginClick(){
    this.firstsign = !this.firstsign;
    this.signin = !this.signin;
  }

  menuRegisterClick(){
    this.firstsign = !this.firstsign;
    this.signup = !this.signup;
  }

  loginClick(credentials, event){
  	//prepare for login, access to api login.
    event.preventDefault();

    this.af.auth.login( credentials, {
                        provider: AuthProviders.Password,
                        method: AuthMethods.Password,
                      }).then(
                        (authData) => {
                          // result example :
                          // {auth: W, uid: "xAHu27AAJShc8cumvQaxgr5bAgh2", provider: 4}
                          const itemObservable = this.af.database.object('/detail_users/' + authData.uid);
                          itemObservable.subscribe(
                              x => {
                                      if( x.hasOwnProperty("$value") && x.$value == null ){
                                        this.email      = credentials.email;
                                        this.password   = credentials.password;
                                        this.firstsign  = true;
                                        this.signin     = false;
                                        this.menuRegisterClick();
                                      }else{
                                        this.navCtrl.setRoot(MyApp);
                                      }
                                    }
                            );
                      }).catch(
                        (err) => {
                          this.error = err;
                          // result example :
                          // {code: "auth/wrong-password", message: "The password is invalid or the user does not have a password."}
                      });
  }

  registerClick(event){
    this.af.auth.subscribe( 
      (val) => {
                if(val == null){
                  this.af.auth.createUser({
                                        email: this.email,
                                        password: this.password
                                      }).then(
                                        (success) => {
                                          // result example :
                                          // {auth: W, uid: "d9LQxALBJ2VKS8aQVTs77TssU782", provider: 4}
                                          const user = this.af.database.object('/detail_users/'+success.uid);
                                          user.set({
                                                    "full_name"     : this.full_name,
                                                    "date_of_birth" : this.date_of_birth,
                                                    "username"      : this.username,
                                                    "password"      : this.password,
                                                    "email"         : this.email,
                                                    "background"    : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/default-background.png?alt=media&token=1d461dcb-d90e-4687-9693-97710ce8f455",
                                                    "picture"       : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/default-user.png?alt=media&token=c03da48f-0675-472d-b9fd-b1603512f28f",
                                                    "bio"           : "",
                                                    "following"     : {
                                                                        "size" : 0,
                                                                        "data" : []
                                                                      },
                                                    "followers"     : {
                                                                        "size" : 0,
                                                                        "data" : []
                                                                      },
                                                    "posts"         : {
                                                                        "size" : 0,
                                                                        "data" : []
                                                                      },
                                                    "show_age_email": true,
                                                    "first_signin"  : true,
                                                    }).then(
                                                      (success) => {
                                                        this.showAlertSuccessRegister();
                                                    }).catch(
                                                        (err) =>{
                                                           this.error = err;
                                                    });
                                      }).catch(
                                        (err) => {
                                          // result example :
                                          // {code: "auth/email-already-in-use", message: "The email address is already in use by another account."}
                                          this.error = err;
                                      });
                }else{

                  const itemObservable = this.af.database.object('/detail_users/'+val.uid);
                  itemObservable.set({
                    "full_name"     : this.full_name,
                    "date_of_birth" : this.date_of_birth,
                    "username"      : this.username,
                    "password"      : this.password,
                    "email"         : this.email,
                    "background"    : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/default-background.png?alt=media&token=1d461dcb-d90e-4687-9693-97710ce8f455",
                    "picture"       : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/default-user.png?alt=media&token=c03da48f-0675-472d-b9fd-b1603512f28f",
                    "bio"           : "",
                    "following"     : {
                                        "size" : 0,
                                        "data" : []
                                      },
                    "followers"     : {
                                        "size" : 0,
                                        "data" : []
                                      },
                    "posts"         : {
                                        "size" : 0,
                                        "data" : []
                                      },
                    "show_age_email": true,
                    "first_signin"  : true,
                  }).then(
                    (success) => {
                      this.showAlertSuccessRegister();
                  }).catch(
                    (err) => {
                      this.error = err;
                  });
                }
              }
    );
  }

  showAlertSuccessRegister() {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Selamat kamu telah terdaftar menjadi bagian JUMPIN!',
      buttons: [
                {
                  text: 'OK',
                  handler: data => {
                    this.navCtrl.setRoot(MyApp);
                  }
                }
               ]
    });
    alert.present();
  }

}
