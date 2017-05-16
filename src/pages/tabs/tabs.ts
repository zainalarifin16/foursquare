import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ActivitiesPage } from '../activities/activities';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';


@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  
  //setup banyak tab yang akan ditampilkan.
  tab1Root: any;
  tab2Root: any;
  tab3Root: any;
  tab4Root: any;
  tabs: any[];


  constructor() {
  	//insialisasi tab-tab yang telah ditentukan.
  	this.tab1Root = HomePage;
  	this.tab2Root = ActivitiesPage;
    this.tab3Root = SearchPage;
  	this.tab4Root = ProfilePage;
  	//isi konten dari tab-tabnya
  	this.tabs = [
        { tabTitle: 'Home', root: HomePage, tabIcon: 'home' },
        { tabTitle: 'Activities', root: ActivitiesPage, tabIcon: 'ios-list-box-outline' },
        { tabTitle: 'Search', root: SearchPage, tabIcon: 'ios-search-outline' },
        { tabTitle: 'Profile', root: ProfilePage, tabIcon: 'contact' },
    ];
  }
}
