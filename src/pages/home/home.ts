import { Component, ViewChild, ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';

import { NearByService } from '../../providers/near-by-service';

import { DetailPlacePage } from '../detail-place/detail-place';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  postsList = [];

  @ViewChild('map') mapElement: ElementRef;

  divMap :any;
  radius :number = 500;
  zoom :number = 16;
  nearbyService :any;
  storage :any;

  constructor(public navCtrl: NavController,
               nearbyService: NearByService,
                     storage: Storage
                        ) {
    this.nearbyService = nearbyService;
    this.storage       = storage;
  	/*this.postsList   = [
                    { name    : "Rumah Padang Mala dicubo", msg     : "Maknyosss tambua cie setiap kali makan disini", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/2003010-20160517024152-2479803753481186.jpg?alt=media&token=670b383a-bc31-4f7e-9d48-c86ddea058ec", checkin: [ "ariefmr", "saido", "ratih" ]
                    },
                    { name    : "Nasi Kuning Bu Imas", msg     : "Sarapan pagi enaknya makan nasi kuning ini nyosss..", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/nasi-kuning-komplit.jpg?alt=media&token=ca2c6d11-9c81-4e2e-8ee8-d8ef41532d1d", checkin: ["ariefmr", "ratih"]
                    },
                    { name    : "Mr. Krab!", msg     : "Fast food paling mantap", image   : "https://firebasestorage.googleapis.com/v0/b/jumpin-6277c.appspot.com/o/main-thumb-t-1558815-200-vadsnhdjulphygnpmbpsajsstdxicfgp.jpeg?alt=media&token=6aaf5940-1ab9-466d-a05b-75541b361b4a", checkin: [ "saido" ]
                    },
                   ];*/
  }

  ionViewDidLoad(){
      this.divMap = this.mapElement.nativeElement;
      this.nearbyService.loadMap(this.divMap, this.zoom).then(
        data => this.postsList = data
      );
  }

  showNearby(status){
    if(status == true){
      
      this.radius = 500;
      this.zoom   = 16;
      this.nearbyService.loadMap(this.divMap, this.zoom).then(
        data => this.postsList = data
      );

    }else if(status == false){
      
      this.zoom   = 13;      
      this.nearbyService.loadMap(this.divMap, this.zoom).then(
        data => this.postsList = data
      );

    }

    /*this.storage.get('postLists').then( 
      (val) => {
                this.postsList = val;
              }
    );*/

  }

  showDetailPlace(place_id){
    let data = {place_id : place_id};
    this.navCtrl.push(DetailPlacePage, data);
  }

}
