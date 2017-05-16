import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NearByService } from '../../providers/near-by-service';

import { DetailPlacePage } from '../detail-place/detail-place';

import { Storage } from '@ionic/storage';

/*
  Generated class for the Activities page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html'
})
export class ActivitiesPage {

  postLists = [];

  @ViewChild('map') mapElement: ElementRef;

  divMap :any;
  radius :number = 500;
  nearbyService :any;
  storage :any;

  constructor(public navCtrl: NavController,
               nearbyService: NearByService,
                     storage: Storage
                     ) {
     this.nearbyService = nearbyService;
     this.storage       = storage;
  }

  ionViewDidLoad() {
    this.divMap = this.mapElement.nativeElement;
    this.storage.get('postLists').then( 
      (val) => {
                if(val == null){
                  this.nearbyService.loadMap(this.divMap, 16);
                }else{
                  this.postLists = val;
                }
               }
     );
  }

  showDetailPlace(place_id){
    let data = {place_id : place_id};
    this.navCtrl.push(DetailPlacePage, data);
  }

}
