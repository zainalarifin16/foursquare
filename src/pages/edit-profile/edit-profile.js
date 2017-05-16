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
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { MyApp } from '../../app/app.component';
import { ProfilePage } from '../profile/profile';
import { AngularFire } from 'angularfire2';
/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var EditProfilePage = (function () {
    function EditProfilePage(navCtrl, storage, af) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.formProfile = {
            full_name: "",
            username: "",
            date_of_birth: "",
            email: "",
            bio: "",
            following: "",
            followers: "",
            // background     : "",
            picture: "",
        };
        this.af = af;
        af.auth.subscribe(function (auth) {
            _this.uid = auth.uid;
            _this.profile = af.database.object('/detail_users/' + auth.uid);
            _this.profile.subscribe(function (x) {
                if (x.first_signin == true) {
                    _this.redirect = MyApp;
                }
                else {
                    _this.redirect = ProfilePage;
                }
                _this.formProfile.full_name = x.full_name;
                _this.formProfile.username = x.username;
                _this.formProfile.date_of_birth = x.date_of_birth;
                _this.formProfile.email = x.email;
                _this.formProfile.bio = x.bio;
                _this.formProfile.following = x.following;
                _this.formProfile.followers = x.followers;
                // this.formProfile.background     = x.background;
                _this.formProfile.picture = x.picture;
                _this.formProfile.first_signin = x.first_signin;
                _this.formProfile.show_age_email = x.show_age_email;
            });
        });
    }
    EditProfilePage.prototype.ionViewDidLoad = function () {
        console.log('Hello EditProfilePage Page');
    };
    EditProfilePage.prototype.cancel = function () {
        this.navCtrl.setRoot(this.redirect);
    };
    EditProfilePage.prototype.save = function () {
        var _this = this;
        this.formProfile.first_signin = false;
        this.profile.update(this.formProfile).then(function (success) {
            _this.navCtrl.setRoot(_this.redirect);
        }, function (err) {
            console.log(err);
        });
    };
    EditProfilePage.prototype.browseImage = function () {
        var _this = this;
        var options = {
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY
        };
        Camera.getPicture(options)
            .then(function (ImageData) {
            _this.formProfile.picture = "data:image/jpeg;base64," + ImageData;
        }, function (err) {
            console.log(err);
        });
    };
    EditProfilePage = __decorate([
        Component({
            selector: 'page-edit-profile',
            templateUrl: 'edit-profile.html'
        }), 
        __metadata('design:paramtypes', [NavController, Storage, AngularFire])
    ], EditProfilePage);
    return EditProfilePage;
}());
//# sourceMappingURL=edit-profile.js.map