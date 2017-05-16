import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

//page
import {LoginPage} from '../login-page/login-page';

import {EditProfilePage} from '../edit-profile/edit-profile';

import * as Promise from 'Promise';

/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
    uid: any;
    dataProfile: FirebaseObjectObservable<any>;
    storage: any;
    profile :any;
    posts :any;
    postsList :any;
    postsGrid :any;
    displayGridPosts :any;
    viewPost: boolean = true;
    af :any;
  constructor(public navCtrl: NavController, 
                     storage: Storage, 
                          af: AngularFire) {
    this.storage = storage;
    this.af = af;
  	this.profile = {
  					username   : "",
  					followers  : "",
  					following  : "",
  					comments   : "",
  					posts      : "",
  					age        : "",
  					bio        : "",
  					background : "",
  					picture    : "",
    };
        af.auth.subscribe(
            (auth) => {
                this.uid = auth.uid;
                this.dataProfile = af.database.object(/detail_users/ + auth.uid);
                this.dataProfile.subscribe(
                    data => {
                        this.profile = data;
                    }
                )
            }
        )
    this.posts   = [
                    //{ name    : "Rumah Padang Mala dicubo", msg     : "Maknyosss tambua cie setiap kali makan disini", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/2003010-20160517024152-2479803753481186.jpg?alt=media&token=670b383a-bc31-4f7e-9d48-c86ddea058ec"
                    //},
                    //{ name    : "Nasi Kuning Bu Imas", msg     : "Sarapan pagi enaknya makan nasi kuning ini nyosss..", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/nasi-kuning-komplit.jpg?alt=media&token=ca2c6d11-9c81-4e2e-8ee8-d8ef41532d1d"
                    //},
                    //{ name    : "Mr. Krab!", msg     : "Fast food paling mantap", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/main-thumb-t-1558815-200-vadsnhdjulphygnpmbpsajsstdxicfgp.jpeg?alt=media&token=6aaf5940-1ab9-466d-a05b-75541b361b4a"
                    //},
                   ];
    //mengatur posisi array dalam satu baris.
    this.postsList = this.posts;
    this.postsGrid = this.displayGrid(this.posts);
  }

  displayGrid(posts){
    var jumlah_kolom = 2;
    var grid = new Array( (posts.length%jumlah_kolom)+1 );
    var baris = 0;
    var kolom = 0;
    for( let i = 0; i < posts.length; i++ )
    {
      if( typeof(grid[baris]) == 'undefined' ){
        grid[baris] = new Array();    
      }
      if( i % jumlah_kolom == 0 && i !=0 ){
        baris++;
        kolom = 0;
        if(typeof(grid[baris]) == 'undefined'){
          grid[baris] = new Array();    
        }
        grid[baris][kolom] = posts[i];
      }else{
        grid[baris][kolom] = posts[i];
      }
      kolom++;

    }
    return grid;
  }

  ionViewDidLoad() {
  }

  editProfile(){
    this.navCtrl.push(EditProfilePage);
  }

  userLogout(){
    this.af.auth.logout();
    this.navCtrl.setRoot(LoginPage);    
    
  }

  showPost(bool){
    this.viewPost = bool;
  }

}
