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
import { HomePage } from '../home/home';
import { ActivitiesPage } from '../activities/activities';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
export var TabsPage = (function () {
    function TabsPage() {
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
    TabsPage = __decorate([
        Component({
            templateUrl: 'tabs.html',
        }), 
        __metadata('design:paramtypes', [])
    ], TabsPage);
    return TabsPage;
}());
//# sourceMappingURL=tabs.js.map