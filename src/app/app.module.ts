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
//angular
import { AngularFireModule } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyC39lelGrLzKF6aDNrve7KC7xnuoXeW1s4',
  // apiKey: 'AIzaSyBI1PVWdJdOTBj2pLg_0ktDcyW8vS_ry8A',
  authDomain: 'localhost',
  databaseURL: 'https://jumpin-6277c.firebaseio.com/',
  storageBucket: 'gs://jumpin-6277c.appspot.com',
  signInOptions: ["password","twitter"]
};

@NgModule({
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
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top', tabsHideOnSubPages: true}),
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
})
export class AppModule {}
