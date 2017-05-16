var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { NearByService } from '../../providers/near-by-service';
import { DetailPlacePage } from '../detail-place/detail-place';
import { Storage } from '@ionic/storage';
export var HomePage = (function () {
    function HomePage(navCtrl, af, nearbyService, storage) {
        this.navCtrl = navCtrl;
        this.postsList = [];
        this.radius = 500;
        this.zoom = 16;
        this.initMap = true;
        this.nearbyService = nearbyService;
        this.storage = storage;
        /*this.postsList   = [
                        { name    : "Rumah Padang Mala dicubo", msg     : "Maknyosss tambua cie setiap kali makan disini", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/2003010-20160517024152-2479803753481186.jpg?alt=media&token=670b383a-bc31-4f7e-9d48-c86ddea058ec", checkin: [ "ariefmr", "saido", "ratih" ]
                        },
                        { name    : "Nasi Kuning Bu Imas", msg     : "Sarapan pagi enaknya makan nasi kuning ini nyosss..", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/nasi-kuning-komplit.jpg?alt=media&token=ca2c6d11-9c81-4e2e-8ee8-d8ef41532d1d", checkin: ["ariefmr", "ratih"]
                        },
                        { name    : "Mr. Krab!", msg     : "Fast food paling mantap", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/main-thumb-t-1558815-200-vadsnhdjulphygnpmbpsajsstdxicfgp.jpeg?alt=media&token=6aaf5940-1ab9-466d-a05b-75541b361b4a", checkin: [ "saido" ]
                        },
                       ];*/
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.divMap = this.mapElement.nativeElement;
        this.nearbyService.loadMap(this.divMap, this.zoom);
        this.storage.get('postLists').then(function (val) {
            _this.postsList = val;
        });
    };
    HomePage.prototype.showNearby = function (status) {
        var _this = this;
        if (status == true) {
            this.radius = 500;
            this.zoom = 16;
            this.nearbyService.loadMap(this.divMap, this.zoom);
        }
        else if (status == false) {
            this.radius = 5000;
            var i = 500;
            while (i < 5000) {
                this.nearbyService.searchNearBy(i);
                i = i + 500;
            }
            this.zoom = 13;
            this.nearbyService.loadMap(this.divMap, this.zoom);
        }
        this.storage.get('postLists').then(function (val) {
            _this.postsList = val;
        });
    };
    HomePage.prototype.showDetailPlace = function (place_id) {
        var data = { place_id: place_id };
        this.navCtrl.push(DetailPlacePage, data);
    };
    __decorate([
        ViewChild('map'), 
        __metadata('design:type', ElementRef)
    ], HomePage.prototype, "mapElement", void 0);
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }), 
        __metadata('design:paramtypes', [NavController, AngularFire, NearByService, Storage])
    ], HomePage);
    return HomePage;
}());
//# sourceMappingURL=home.js.map