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

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: any[];

  constructor(private platform: Platform, private menu: MenuController, storage: Storage, af: AngularFire) {

    this.menu = menu;
    this.menu.enable(false);
    this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Contact', component: SearchPage },
        { title: 'About', component: ActivitiesPage },
        { title: 'Login', component: LoginPage }
    ];
    af.auth.subscribe(
      x => {
            if(x != null){
              const detail_user = af.database.object("/detail_users/"+x.uid);
              detail_user.subscribe(
                detail => {
                            if(detail.first_signin == true){
                              this.rootPage = EditProfilePage;
                            }else if(detail.first_signin == false){
                              this.rootPage = TabsPage;
                            }else{
                              this.rootPage = LoginPage;
                            }
                          }
              );
            }else{
              this.rootPage = LoginPage;            
            }
           }
    );
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

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    this.menu.close()
    // Using this.nav.setRoot() causes
    // Tabs to not show!
    console.log(this.nav);
    this.nav.push(page.component);
    // this.rootPage = page.component;
  }

}
