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
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login-page/login-page';
import { EditProfilePage } from '../edit-profile/edit-profile';
/*
  Generated class for the Profile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var ProfilePage = (function () {
    function ProfilePage(navCtrl, storage) {
        this.navCtrl = navCtrl;
        this.viewPost = true;
        this.storage = storage;
        this.profile = {
            name: "Zainal Arifin",
            username: "zainalarifin",
            followers: 1,
            following: 3,
            comments: 4,
            posts: 10,
            age: 25,
            bio: "Hello World!",
            background: "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/greasy-fast-food.jpg?alt=media&token=a94275db-5f24-4c65-ad74-453d07ee324d",
            picture: "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/WWyoAyIFJoWSGDj4VzBPKdyME3G2.jpg?alt=media&token=c36f43b1-b268-414d-a938-55a0f3be74e8",
        };
        this.posts = [
            { name: "Rumah Padang Mala dicubo", msg: "Maknyosss tambua cie setiap kali makan disini", image: "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/2003010-20160517024152-2479803753481186.jpg?alt=media&token=670b383a-bc31-4f7e-9d48-c86ddea058ec"
            },
            { name: "Nasi Kuning Bu Imas", msg: "Sarapan pagi enaknya makan nasi kuning ini nyosss..", image: "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/nasi-kuning-komplit.jpg?alt=media&token=ca2c6d11-9c81-4e2e-8ee8-d8ef41532d1d"
            },
            { name: "Mr. Krab!", msg: "Fast food paling mantap", image: "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/main-thumb-t-1558815-200-vadsnhdjulphygnpmbpsajsstdxicfgp.jpeg?alt=media&token=6aaf5940-1ab9-466d-a05b-75541b361b4a"
            },
        ];
        //mengatur posisi array dalam satu baris.
        this.postsList = this.posts;
        this.postsGrid = this.displayGrid(this.posts);
    }
    ProfilePage.prototype.displayGrid = function (posts) {
        var jumlah_kolom = 2;
        var grid = new Array((posts.length % jumlah_kolom) + 1);
        var baris = 0;
        var kolom = 0;
        for (var i = 0; i < posts.length; i++) {
            if (typeof (grid[baris]) == 'undefined') {
                grid[baris] = new Array();
            }
            if (i % jumlah_kolom == 0 && i != 0) {
                baris++;
                kolom = 0;
                if (typeof (grid[baris]) == 'undefined') {
                    grid[baris] = new Array();
                }
                grid[baris][kolom] = posts[i];
            }
            else {
                grid[baris][kolom] = posts[i];
            }
            kolom++;
        }
        return grid;
    };
    ProfilePage.prototype.ionViewDidLoad = function () {
    };
    ProfilePage.prototype.editProfile = function () {
        this.navCtrl.push(EditProfilePage);
    };
    ProfilePage.prototype.userLogout = function () {
        this.storage.remove('uid');
        this.navCtrl.setRoot(LoginPage);
    };
    ProfilePage.prototype.showPost = function (bool) {
        this.viewPost = bool;
    };
    ProfilePage = __decorate([
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html',
        }), 
        __metadata('design:paramtypes', [NavController, Storage])
    ], ProfilePage);
    return ProfilePage;
}());
//# sourceMappingURL=profile.js.map