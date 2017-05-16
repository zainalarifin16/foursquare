var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from 'ionic-native';
import { AngularFire } from 'angularfire2';
import { Storage } from '@ionic/storage';
/*
  Generated class for the NearByService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export var NearByService = (function () {
    function NearByService(http, af, storage) {
        this.http = http;
        this.postsList = [];
        this.radius = 500;
        this.initMap = true;
        this.af = af;
        this.storage = storage;
    }
    NearByService.prototype.load = function () {
    };
    NearByService.prototype.createMarker = function (results) {
        var _this = this;
        results.then(function (resultsPlace) {
            if (_this.radius == 500) {
                _this.postsList = [];
            }
            _this.infoWindow = new google.maps.InfoWindow();
            resultsPlace.forEach(function (place, i) {
                var marker = new google.maps.Marker({
                    map: _this.map,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP,
                });
                var placeFire = _this.af.database.object('/places/' + place.place_id);
                var available = false;
                var placeNearby = {
                    "place_id": place.place_id,
                    "name": place.name,
                    "icon": place.icon,
                    "opening_hours": place.opening_hours || "",
                    "google_rating": place.rating || 0.0,
                    "types": place.types,
                };
                placeFire.subscribe(function (data) {
                    if (!data.hasOwnProperty("$value") && data.$value != null) {
                        available = true;
                    }
                });
                if (!available) {
                    placeFire.set(placeNearby);
                }
                var findPostPlace = false;
                _this.postsList.forEach(function (postPlace, j) {
                    if (findPostPlace == false) {
                        if (postPlace.place_id == place.place_id) {
                            findPostPlace = true;
                        }
                    }
                });
                if (findPostPlace == false) {
                    _this.postsList.push(placeNearby);
                }
                console.log(place);
            });
            _this.storage.set('postLists', _this.postsList);
        });
    };
    NearByService.prototype.loadMap = function (divMap, zoom) {
        var _this = this;
        console.log("loadMap");
        if (Geolocation) {
            Geolocation.getCurrentPosition().then(function (position) {
                _this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                if (_this.initMap == true) {
                    var mapOptions = {
                        center: _this.latLng,
                        zoom: zoom,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        disableDefaultUI: true
                    };
                    _this.map = new google.maps.Map(divMap, mapOptions);
                    var marker = new google.maps.Marker({
                        map: _this.map,
                        animation: google.maps.Animation.DROP,
                        position: _this.map.getCenter()
                    });
                    _this.initMap = false;
                    _this.searchNearBy(_this.radius);
                }
                else {
                    _this.map.setZoom(zoom);
                }
                return _this.postsList;
            }, function (err) {
                console.log(err);
            });
        }
        else {
            console.log("wew");
        }
    };
    NearByService.prototype.searchNearBy = function (radius) {
        this.radius = radius;
        var service = new google.maps.places.PlacesService(this.map);
        var request = {
            location: this.latLng,
            radius: radius,
            types: ['cafe', 'bakery', 'restaurant',]
        };
        var result = new Promise(function (resolve) {
            service.nearbySearch(request, function (results, status) {
                resolve(results);
            });
        });
        this.createMarker(result);
    };
    __decorate([
        ViewChild('map'), 
        __metadata('design:type', ElementRef)
    ], NearByService.prototype, "mapElement", void 0);
    NearByService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, AngularFire, Storage])
    ], NearByService);
    return NearByService;
}());
//# sourceMappingURL=near-by-service.js.map