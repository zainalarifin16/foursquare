import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
// import * as $ from 'jquery';

import * as Promise from 'Promise';

declare var google;

/*
  Generated class for the DetailPlace page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-detail-place',
  templateUrl: 'detail-place.html'
})
export class DetailPlacePage {

    @ViewChild('map') mapElement: ElementRef;
    coord: any;
  map :any;
  place_id :any;
  dataPlace :any;
  review :any = 'pro';
  timelineOrPost: any = 'timeline';
  private CheckPlatform: Platform;
  private isAndroid: boolean;

  constructor(public navCtrl: NavController,
           private navParams: NavParams,
            private platform: Platform) {
  	// console.log(navParams.get('place_id'));
    this.place_id = navParams.get('place_id');
    this.CheckPlatform = platform;
    this.isAndroid = platform.is("android");
    this.dataPlace = {
                      icon                   : '',
                      name                   : '',
                      formatted_address      : '',
                      formatted_phone_number : '',
    };
    this.coord = {
        lat: '',
        lng: '',
    }

  }

  openAppsMap() {
      let coord = this.coord.lat + "," + this.coord.lng;
      if (this.isAndroid) {
          window.open("geo:" + coord);
          return;
      }
      window.open("http://maps.google.com/?q=" + coord, "_system");
      return;
  }

  resultDetailPlace(result){
    result.then( (resultPlace) => {
        this.dataPlace = resultPlace;
        if (this.dataPlace.photos.length > 0) {
            this.dataPlace.photos.forEach((foto, i) => {
                console.log(foto.getUrl({ 'maxWidth': 1200, 'maxHeight': 800 }));
            });
        }
        this.coord.lat = this.dataPlace.geometry.location.lat();
        this.coord.lng = this.dataPlace.geometry.location.lng();
    });
  }

  ionViewDidLoad() {
    let mapOptions = {
            mapTypeId        : google.maps.MapTypeId.ROADMAP,
            disableDefaultUI : true
          };
          
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let service = new google.maps.places.PlacesService(this.map);

    let result = new Promise( (resolve) => {
      service.getDetails({
          placeId: this.place_id
        }, function(place, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
          }
        });
    });

    this.resultDetailPlace( result );
    
  }

}
