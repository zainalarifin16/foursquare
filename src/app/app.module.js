var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { LoginPage } from '../pages/login-page/login-page';
import { MyApp } from './app.component';
import { ActivitiesPage } from '../pages/activities/activities';
import { SearchPage } from '../pages/search/search';
import { HomePage } from '../pages/home/home';
import { DetailPlacePage } from '../pages/detail-place/detail-place';
import { ProfilePage } from '../pages/profile/profile';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { TabsPage } from '../pages/tabs/tabs';
import { NearByService } from '../providers/near-by-service';
import { Storage } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
// Must export the config
export var firebaseConfig = {
    apiKey: 'AIzaSyC39lelGrLzKF6aDNrve7KC7xnuoXeW1s4',
    // apiKey: 'AIzaSyBI1PVWdJdOTBj2pLg_0ktDcyW8vS_ry8A',
    authDomain: 'localhost',
    databaseURL: 'https://jumpin-6277c.firebaseio.com/',
    storageBucket: 'gs://jumpin-6277c.appspot.com',
    signInOptions: ["password", "twitter"]
};
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [
                MyApp,
                ActivitiesPage,
                SearchPage,
                HomePage,
                DetailPlacePage,
                LoginPage,
                ProfilePage,
                EditProfilePage,
                TabsPage,
            ],
            imports: [
                IonicModule.forRoot(MyApp, { tabsPlacement: 'top', tabsHideOnSubPages: true }),
                AngularFireModule.initializeApp(firebaseConfig)
            ],
            bootstrap: [IonicApp],
            entryComponents: [
                MyApp,
                ActivitiesPage,
                SearchPage,
                HomePage,
                DetailPlacePage,
                LoginPage,
                ProfilePage,
                EditProfilePage,
                TabsPage
            ],
            providers: [
                Storage,
                NearByService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map