import { Component, OnInit, Input } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  @Input() requests?: IUrgentRequest[];
  constructor() { }

  ngOnInit(): void {
    let map: google.maps.Map, infoWindow: google.maps.InfoWindow;
    console.log(this.requests);
    let loader = new Loader({
      apiKey: 'AIzaSyBqQxuTNsEwx7K_2nQlaDlqwk1LTbi_yP0'
    })

    // const locationButton = document.createElement("button");
    // locationButton.textContent = "Current position";
    // locationButton.classList.add("custom-map-control-button");
    loader.load().then(() => {
      map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 15,
      })

      infoWindow = new google.maps.InfoWindow();
      // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
      getCurrentLocation();
      this.requests?.forEach(request => {
        addMarker(request)
      });
    })
    
    function addMarker(request: IUrgentRequest) {
      var marker = new google.maps.Marker({
        position: { lat: <number>request?.position?.lat, lng: <number>request?.position?.lng },
        map:map
      });
      var infoWindow = new google.maps.InfoWindow({
        content:'<h3>'+request.data+'</h3>'
      });
      marker.addListener('click',function(){
        infoWindow.open(map,marker);
      })
    }
    // locationButton.addEventListener("click", getCurrentLocation);

    function getCurrentLocation() {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            map.setCenter(pos);
          },
          () => {
            handleLocationError(true, infoWindow, map.getCenter()!);
          }
        );
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter()!);
      }
    }


    function handleLocationError(
      browserHasGeolocation: boolean,
      infoWindow: google.maps.InfoWindow,
      pos: google.maps.LatLng
    ) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
  }



}
