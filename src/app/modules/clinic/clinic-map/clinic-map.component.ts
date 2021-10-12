
import { ConstantsService } from 'src/app/shared/constant/constants.service';
import { StorageService } from 'src/app/core/services/storage.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnDestroy,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../../environments/environment';
import asset from '../../../../assets/marker'
import { RequestCardDetailsComponent } from 'src/app/shared/components/request-card-details/request-card-details.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LocationService } from 'src/app/shared/subjects/location.service';
@Component({
  selector: 'app-clinic-map',
  templateUrl: './clinic-map.component.html',
  styleUrls: ['./clinic-map.component.scss']
})
export class ClinicMapComponent implements OnInit, OnDestroy, OnChanges {

  @Input() clinics?: IGroup[];
  @Input() set selectLocationMode(value: boolean) {
    this._selectLocationMode = value;
    if (this.selectorMarker) {
      this.selectorMarker.setVisible(value)
    }
  };
  @Output() pickedLocation = new EventEmitter<google.maps.LatLng>();

  _selectLocationMode: boolean = false;
  map: google.maps.Map | undefined;
  infoWindow: google.maps.InfoWindow | undefined;
  toggleStatus: string = 'Ẩn bớt';
  markers: google.maps.Marker[] = []
  loader = new Loader({
    apiKey: environment.googleApiKey,
  });
  subscription: any;
  selectorMarker?: google.maps.Marker;

  toggle() {
    if (this.toggleStatus == 'Ẩn bớt') {
      document.getElementById('clinic_list')?.classList.add('n0');
      this.toggleStatus = 'Hiện thêm';
    } else {
      document.getElementById('clinic_list')?.classList.remove('n0');
      this.toggleStatus = 'Ẩn bớt';
    }
  }
  constructor(private storageService: StorageService, private constantsService: ConstantsService, private locationService: LocationService,
    private bottomsheet: MatBottomSheet) {
  }
  setMapOnAll(map: any) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  addMarker = (clinic: IGroup, chooseClinic: Function) => {
    const icon = (color: string = this.constantsService.DEFAULT_REQUEST_COLOR) => {
      return asset.createMarker(color)
    };
    var location = clinic?.location?.split(',');
    var lat = parseFloat(location![0]);
    var lng = parseFloat(location![1]);
    var marker = new google.maps.Marker({
      position: { lat: <number>lat, lng: <number>lng },
      map: this.map,
      icon: icon(),
    });
    this.markers.push(marker);
    marker.addListener('click', function () {
      chooseClinic(clinic);
    });
  }
  ngOnInit(): void {
    this.loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.storageService.location,
        zoom: 15,
        styles: environment.mapStyle,
      });
      this.infoWindow = new google.maps.InfoWindow();
      this.clinics?.forEach((clinic) => {
        this.addMarker(clinic, this.chooseClinic.bind(this));
      });

      this.choseLocationMarker();
    });
    this.subscription = this.storageService.locationSubject.subscribe({
      next: (location: ILocation) => {
        this.map?.setCenter({
          lat: location.lat,
          lng: location.lng
        })
      }
    })
  }

  chooseClinic(clinic: IGroup) {
    // const dialogRef = this.bottomsheet.open(RequestCardDetailsComponent, {
    //   data: { request, session: this.constantsService.SESSION.MAP_REQUESTS },
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setMapOnAll(null);
    this.markers = [];
    this.clinics?.forEach((clinic) => {
      this.addMarker(clinic, this.chooseClinic.bind(this));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  choseLocationMarker() {
    var marker = new google.maps.Marker({
      position: this.storageService.location,
      map: this.map,
      draggable: true,
      zIndex: 9999
    });

    google.maps.event.addListener(marker, 'dragend', () => {
      const location = marker.getPosition()
      if (location) {
        this.pickedLocation.next(location)
      }
    });

    this.selectorMarker = marker;
    this.selectorMarker.setVisible(this._selectLocationMode)
  }
}
