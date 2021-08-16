import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
// import { ISOSRequest } from 'src/typings';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() requests?: ISOSRequest[];
  @Output() clickedRequest = new EventEmitter<ISOSRequest>();
  constructor() { console.log(this.requests); }
  ngOnInit(): void {
    console.log(this.requests);

  }
  chooseRequest(request: ISOSRequest) {
    this.clickedRequest.emit(request)

  }
  ngOnChanges(changes: SimpleChanges): void {
    let map: google.maps.Map, infoWindow: google.maps.InfoWindow;
    console.log(this.requests);
    let loader = new Loader({
      apiKey: environment.googleApiKey
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
      console.log(this.requests);
      this.requests?.forEach(request => {
        addMarker(request, this.chooseRequest.bind(this))
      });
    })

    function addMarker(request: ISOSRequest, chooseRequest: Function) {
      console.log(request);
      var location = request?.location?.split(',');
      var lat = parseFloat(location![0]);
      var lng = parseFloat(location![1]);
      console.log(location);
      var marker = new google.maps.Marker({
        position: { lat: <number>lat, lng: <number>lng },
        map: map
      });

      marker.addListener('click', function () {
        chooseRequest(request);
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
