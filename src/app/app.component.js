var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login-page/login-page';
import { TabsPage } from '../pages/tabs/tabs';
import { ActivitiesPage } from '../pages/activities/activities';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { Storage } from '@ionic/storage';
import { AngularFire } from 'angularfire2';
export var MyApp = (function () {
    function MyApp(platform, menu, storage, af) {
        var _this = this;
        this.platform = platform;
        this.menu = menu;
        this.menu = menu;
        this.menu.enable(false);
        this.pages = [
            { title: 'Home', component: HomePage },
            { title: 'Contact', component: SearchPage },
            { title: 'About', component: ActivitiesPage },
            { title: 'Login', component: LoginPage }
        ];
        af.auth.subscribe(function (x) {
            if (x != null) {
                var detail_user = af.database.object("/detail_users/" + x.uid);
                detail_user.subscribe(function (detail) {
                    if (detail.first_signin == true) {
                        _this.rootPage = EditProfilePage;
                    }
                    else if (detail.first_signin == false) {
                        _this.rootPage = TabsPage;
                    }
                    else {
                        _this.rootPage = LoginPage;
                    }
                });
            }
            else {
                _this.rootPage = LoginPage;
            }
        });
        /*storage.get('uid').then((val) => {
          if(val == null){
            this.rootPage = LoginPage;
          }else{
            storage.get('initialState').then((val) => {
              if(val == true){
                this.rootPage = EditProfilePage;
              }else{
                this.rootPage = HomePage;
              }
            });
          }
        });*/
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }
    MyApp.prototype.openPage = function (page) {
        this.menu.close();
        // Using this.nav.setRoot() causes
        // Tabs to not show!
        console.log(this.nav);
        this.nav.push(page.component);
        // this.rootPage = page.component;
    };
    __decorate([
        ViewChild(Nav), 
        __metadata('design:type', Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }), 
        __metadata('design:paramtypes', [Platform, MenuController, Storage, AngularFire])
    ], MyApp);
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map