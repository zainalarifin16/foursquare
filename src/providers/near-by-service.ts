import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Geolocation } from 'ionic-native';

import { AngularFire } from 'angularfire2';

import * as Promise from 'Promise';

declare var google;

//import { Storage } from '@ionic/storage';

//import * as jQuery from 'jquery';


/*
  Generated class for the NearByService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NearByService {
  postsList = [];
  @ViewChild('map') mapElement: ElementRef;
  map :any;
  infoWindow :any;
  af :any;
  radius :number = 500;
  initMap :boolean = true;

  constructor(public http: Http,
  					   af: AngularFire) {
  	this.af 	 = af;
  }

  load(){
  	
  }

  createMarker(results, latLng){
      
      let listPosts = [];

      if(this.postsList.length != 0){
        listPosts = this.postsList
      }
      results.then( (resultsPlace) => {
        this.infoWindow = new google.maps.InfoWindow();
        resultsPlace.forEach( (place, i) =>{
          const placeFire = this.af.database.object('/places/'+place.place_id);
          let available = false;
          let placeNearby = {
          					        "place_id"		     : place.place_id,
          					        "geometry"		     : {
                          										    "lat" : 0,
                          										    "lng" : 0
                          									   },
                              "name"           : place.name,
                              "icon"           : place.icon,
                              "opening_hours"  : place.opening_hours || "",
                              "types"          : place.types,
                              "photos"		     : [],
                            };

          //ambil lat lng
          placeNearby.geometry.lat = place.geometry.location.lat();
          placeNearby.geometry.lng = place.geometry.location.lng();
          //ambil url foto simpan di firebase.
          if( place.hasOwnProperty("photos") ){
          	place.photos.forEach( (foto, i) =>{
  	        	placeNearby.photos.push(foto.getUrl({'maxWidth': 1200, 'maxHeight': 800}));
  	        });
          }

          placeFire.subscribe(
            (data) => {
                        if( !data.hasOwnProperty("$value") && data.$value != null ){
                          available = true;
                        }
                      }
          );

          if(!available){
            placeFire.set(placeNearby);
          }
          let findPostPlace = false;
          listPosts.forEach( (postPlace, j) => {
            if(findPostPlace == false){
              if(postPlace.place_id == place.place_id){
                findPostPlace = true;
              }
            }
          });

          if(findPostPlace == false){
              listPosts.push(placeNearby);
              new google.maps.Marker({
                    map: this.map,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP,
                  });
              //distance 
              /*let distance = new Promise( 
                  (resolve) => {
                                checkDistance(this.latLng);
                                function checkDistance(latLng){
                                    
                                }
                              }
              );
              
              distance.then( (result) => {
                  placeNearby.distance_temp = String(result);
                  new google.maps.Marker({
                    map: this.map,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP,
                  });
                  this.postsList.push(placeNearby);
                } 
              );*/
          }

        });
        
        let placeSearch = [];
        let MAX_DIMESIONS_PLACE = 24;               
        let batch = 0;
        let lengthPlace = listPosts.length;
        if(lengthPlace > 24)
        {
          console.log("Banyak data yan akan diinputkan : "+lengthPlace);
          listPosts.forEach( (postPlace, j) => {
              if(j % MAX_DIMESIONS_PLACE != 0){
                placeSearch.push( new google.maps.LatLng(postPlace.geometry.lat, postPlace.geometry.lng) );                
              }else if( (j % MAX_DIMESIONS_PLACE == 0 || j == lengthPlace) && j != 0 ){
                console.log("Banyak Data yang diinputkan : "+j);
                setTimeout( () => {
                  this.calculateDistance(latLng, placeSearch).then(
                    (data) => {
                      console.log("upper 24");
                      console.log(data);
                        data["rows"][0]["elements"].forEach( (dataDest, index) => {
                          listPosts[index+batch]["distance"] = dataDest.distance.text;
                        });
                    },
                    (error) => {
                      console.log("data ke "+j+" Error :"+error);
                    }
                  )
              }, 1000 * (batch +1 ) );
                batch = batch + MAX_DIMESIONS_PLACE;
                placeSearch = [];                
              }
          });

        }else{
          listPosts.forEach( (postPlace, j) => {
              placeSearch.push( new google.maps.LatLng(postPlace.geometry.lat, postPlace.geometry.lng) );
          });
          this.calculateDistance(latLng, placeSearch).then(
                (data) => {
                  console.log("under 24");
                  console.log(data);
                    data["rows"][0]["elements"].forEach( (dataDest, index) => {
                      listPosts[index]["distance"] = dataDest.distance.text;
                    });
                }
              )
        }
      });
    return listPosts;
  }

  calculateDistance(latLng, placeSearch){
    

    return new Promise( 
      (resolve, reject) => {

        let serviceDistance = new google.maps.DistanceMatrixService();
        serviceDistance.getDistanceMatrix(
                                        {
                                          origins: [ latLng ],
                                          destinations: placeSearch,
                                          travelMode: 'DRIVING',
                                        },function(response, status){
                                          {
                                            if(status == "OK"){
                                              resolve(response);
                                            }else{
                                              reject(status);
                                            }
                                          }
                                        }
                                      );
      });

  }

 loadMap (divMap, zoom){
 	return new Promise( 
     (resolve, reject) => {
                   if(Geolocation){
                      Geolocation.getCurrentPosition().then( (position) => {
                        //let strLat = position.coords.latitude;
                        //let strLng = position.coords.longitude;
                        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                        if(this.initMap == true){
                          let mapOptions = {
                            center           : latLng,
                            zoom             : zoom,
                            mapTypeId        : google.maps.MapTypeId.ROADMAP,
                            disableDefaultUI : true
                          }
                          this.map = new google.maps.Map(divMap, mapOptions);
                          new google.maps.Marker({
                            map: this.map,
                            animation: google.maps.Animation.DROP,
                            position: this.map.getCenter()
                          });

                          this.initMap = false;
                          this.postsList = [];
                          this.postsList =  this.searchNearBy(this.map, latLng, this.radius);
                        }else{
                          let i = 500;
                          while(i < 5000){
                            this.postsList = this.searchNearBy(this.map, latLng, i);
                            i = i + 500;        
                          }
                          this.map.setZoom(zoom);
                          this.initMap = true;
                        }
                        console.log(this.postsList);
                        resolve(this.postsList);

                      }, (err) => {
                        reject(err);
                      });
                    }else{
                      reject("Gelocation Not Found!")
                    }  
     }
   )
 }

 searchNearBy(map, latLng, radius){
    let service = new google.maps.places.PlacesService(map);
        let request = {
                        location: latLng,
                        radius: radius,
                        types: ['cafe', 'bakery', 'restaurant', ]
                      };
    let result = new Promise( (resolve) => {
        service.nearbySearch(request, function(results, status){
          resolve(results);
        });
      });

	  return this.createMarker(result, latLng);
  }

}
