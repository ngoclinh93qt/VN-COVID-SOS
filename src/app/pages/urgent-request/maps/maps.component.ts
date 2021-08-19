import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
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
  getLocation(): any {
    let location = localStorage.getItem("location");
    if (!location) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        localStorage.setItem("location", JSON.stringify({ lat: lat, long: long }));
      });
      return this.getLocation();
    }
    return JSON.parse(location!);
  }
  ngOnChanges(changes: SimpleChanges): void {
    const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "blue",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  };
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
        center: this.getLocation(),
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
