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
import { NavController, NavParams } from 'ionic-angular';
/*
  Generated class for the DetailPlace page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export var DetailPlacePage = (function () {
    function DetailPlacePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.review = 'pro';
        this.timelineOrPost = 'timeline';
        // console.log(navParams.get('place_id'));
        this.place_id = navParams.get('place_id');
        this.dataPlace = {
            icon: '',
            name: '',
            formatted_address: '',
            formatted_phone_number: '',
        };
    }
    DetailPlacePage.prototype.resultDetailPlace = function (result) {
        var _this = this;
        result.then(function (resultPlace) {
            _this.dataPlace = resultPlace;
        });
    };
    DetailPlacePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var mapOptions = {
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var service = new google.maps.places.PlacesService(this.map);
        var result = new Promise(function (resolve) {
            service.getDetails({
                placeId: _this.place_id
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    resolve(place);
                    place.photos.forEach(function (foto, i) {
                        console.log(foto.getUrl({ 'maxWidth': 1200, 'maxHeight': 800 }));
                    });
                }
            });
        });
        this.resultDetailPlace(result);
    };
    __decorate([
        ViewChild('map'), 
        __metadata('design:type', ElementRef)
    ], DetailPlacePage.prototype, "mapElement", void 0);
    DetailPlacePage = __decorate([
        Component({
            selector: 'page-detail-place',
            templateUrl: 'detail-place.html'
        }), 
        __metadata('design:paramtypes', [NavController, NavParams])
    ], DetailPlacePage);
    return DetailPlacePage;
}());
//# sourceMappingURL=detail-place.js.map