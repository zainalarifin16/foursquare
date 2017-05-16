/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
export var LoginPage = (function () {
    function LoginPage(navCtrl, alertCtrl, af, builder, _params) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this._params = _params;
        this.firstsign = true;
        this.signin = false;
        this.signup = false;
        this.af = af;
        // this.af = _params.get("af");
        this.loginForm = builder.group({
            'email': [
                '',
                [Validators.required, Validators.minLength(5)]
            ],
            'password': [
                '',
                [Validators.required, Validators.minLength(5)]
            ]
        });
    }
    LoginPage.prototype.menuLoginClick = function () {
        this.firstsign = !this.firstsign;
        this.signin = !this.signin;
    };
    LoginPage.prototype.menuRegisterClick = function () {
        this.firstsign = !this.firstsign;
        this.signup = !this.signup;
    };
    LoginPage.prototype.loginClick = function (credentials, event) {
        var _this = this;
        //prepare for login, access to api login.
        event.preventDefault();
        this.af.auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
        }).then(function (authData) {
            // result example :
            // {auth: W, uid: "xAHu27AAJShc8cumvQaxgr5bAgh2", provider: 4}
            var itemObservable = _this.af.database.object('/detail_users/' + authData.uid);
            itemObservable.subscribe(function (x) {
                if (x.hasOwnProperty("$value") && x.$value == null) {
                    _this.email = credentials.email;
                    _this.password = credentials.password;
                    _this.firstsign = true;
                    _this.signin = false;
                    _this.menuRegisterClick();
                }
                else {
                    _this.navCtrl.setRoot(MyApp);
                }
            });
        }).catch(function (err) {
            _this.error = err;
            // result example :
            // {code: "auth/wrong-password", message: "The password is invalid or the user does not have a password."}
        });
    };
    LoginPage.prototype.registerClick = function (event) {
        var _this = this;
        this.af.auth.subscribe(function (val) {
            if (val == null) {
                _this.af.auth.createUser({
                    email: _this.email,
                    password: _this.password
                }).then(function (success) {
                    // result example :
                    // {auth: W, uid: "d9LQxALBJ2VKS8aQVTs77TssU782", provider: 4}
                    var user = _this.af.database.object('/detail_users/' + success.uid);
                    user.set({
                        "full_name": _this.full_name,
                        "date_of_birth": _this.date_of_birth,
                        "username": _this.username,
                        "password": _this.password,
                        "email": _this.email,
                        "picture": 'https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/default-user.png?alt=media&token=c03da48f-0675-472d-b9fd-b1603512f28f',
                        "bio": "",
                        "following": {
                            "size": 0,
                            "data": []
                        },
                        "followers": {
                            "size": 0,
                            "data": []
                        },
                        "posts": {
                            "size": 0,
                            "data": []
                        },
                        "show_age_email": true,
                        "first_signin": true,
                    }).then(function (success) {
                        _this.showAlertSuccessRegister();
                    }).catch(function (err) {
                        _this.error = err;
                    });
                }).catch(function (err) {
                    // result example :
                    // {code: "auth/email-already-in-use", message: "The email address is already in use by another account."}
                    _this.error = err;
                });
            }
            else {
                var itemObservable = _this.af.database.object('/detail_users/' + val.uid);
                itemObservable.set({
                    "full_name": _this.full_name,
                    "date_of_birth": _this.date_of_birth,
                    "username": _this.username,
                    "password": _this.password,
                    "email": _this.email,
                    "picture": 'https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/default-user.png?alt=media&token=c03da48f-0675-472d-b9fd-b1603512f28f',
                    "bio": "",
                    "following": {
                        "size": 0,
                        "data": []
                    },
                    "followers": {
                        "size": 0,
                        "data": []
                    },
                    "posts": {
                        "size": 0,
                        "data": []
                    },
                    "show_age_email": true,
                    "first_signin": true,
                }).then(function (success) {
                    _this.showAlertSuccessRegister();
                }).catch(function (err) {
                    _this.error = err;
                });
            }
        });
    };
    LoginPage.prototype.showAlertSuccessRegister = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Selamat kamu telah terdaftar menjadi bagian JUMPIN!',
            buttons: [
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.navCtrl.setRoot(MyApp);
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login-page',
            templateUrl: 'login-page.html'
        }), 
        __metadata('design:paramtypes', [NavController, AlertController, AngularFire, FormBuilder, NavParams])
    ], LoginPage);
    return LoginPage;
}());
//# sourceMappingURL=login-page.js.map