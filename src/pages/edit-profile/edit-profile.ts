import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { Storage } from '@ionic/storage';

//page
import { MyApp } from '../../app/app.component';
import { ProfilePage } from '../profile/profile';

//angularfire
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import * as Promise from 'Promise';

/*
  Generated class for the EditProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  profile     :FirebaseObjectObservable<any>;
  formProfile :any;
  storage     :any;
  redirect    :any;
  af          :any;
  uid         :any;
  constructor(public navCtrl: NavController,
                     storage: Storage,
                     af: AngularFire) {
    this.formProfile = {
            full_name      : "",
            username       : "",
            date_of_birth  : "",
            email          : "",
            bio            : "",
            following      : "",
            followers      : "",
            // background     : "",
            picture        : "",
            };
    this.af = af;
    af.auth.subscribe(
      (auth) => {
                  this.uid = auth.uid;
                  this.profile = af.database.object('/detail_users/'+auth.uid);
                  this.profile.subscribe(
                      x => {
                            if(x.first_signin == true){
                              this.redirect = MyApp;
                            }else{
                              this.redirect = ProfilePage;
                            }
                            this.formProfile.full_name      = x.full_name;
                            this.formProfile.username       = x.username;
                            this.formProfile.date_of_birth  = x.date_of_birth;
                            this.formProfile.email          = x.email;
                            this.formProfile.bio            = x.bio;
                            this.formProfile.following      = x.following;
                            this.formProfile.followers      = x.followers;
                            // this.formProfile.background     = x.background;
                            this.formProfile.picture        = x.picture;
                            this.formProfile.first_signin   = x.first_signin;
                            this.formProfile.show_age_email = x.show_age_email;
                           }
                    );
                }
    );
      
  }

  ionViewDidLoad() {
    console.log('Hello EditProfilePage Page');
  }

  cancel(){
    this.navCtrl.setRoot(this.redirect);
  }

  save(){
    this.formProfile.first_signin = false;
    this.profile.update(this.formProfile).then(
      (success) => {
                      this.navCtrl.setRoot( this.redirect );
                   },
      (err) => {
                  console.log(err);
               }
    );

  }

  browseImage(){
  	let options = {
	    destinationType   : Camera.DestinationType.DATA_URL,
	    sourceType        : Camera.PictureSourceType.PHOTOLIBRARY
  	};

    Camera.getPicture(options)
      .then((ImageData) => {
        this.formProfile.picture = "data:image/jpeg;base64," + ImageData;
      }, (err) => {
        console.log(err);
      })
  }
}
