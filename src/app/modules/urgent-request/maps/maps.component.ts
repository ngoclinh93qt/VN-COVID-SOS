import { StorageService } from 'src/app/core/services/storage.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from '../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import asset from '../../../../assets/marker'
import { RequestCardDetailsComponent } from 'src/app/shared/components/request-card-details/request-card-details.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, OnChanges {
  @Input() requests?: ISOSRequest[];
  map: google.maps.Map | undefined;
  infoWindow: google.maps.InfoWindow | undefined;
  toggleStatus: string = 'Ẩn bớt';
  markers: any[] = []
  loader = new Loader({
    apiKey: environment.googleApiKey,
  });
  toggle() {
    if (this.toggleStatus == 'Ẩn bớt') {
      document.getElementById('request_list')?.classList.add('n0');
      this.toggleStatus = 'Hiện thêm';
    } else {
      document.getElementById('request_list')?.classList.remove('n0');
      this.toggleStatus = 'Ẩn bớt';
    }
  }
  constructor(private StorageService: StorageService, 
    private bottomsheet: MatBottomSheet) {
    console.log(this.requests);
  }
  setMapOnAll(map: any) {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  addMarker = (request: ISOSRequest, chooseRequest: Function) => {
    const icon = (type: string) => {
      if (type == 'orange')
        return asset.orange
      return asset.red;
    };
    var location = request?.location?.split(',');
    var lat = parseFloat(location![0]);
    var lng = parseFloat(location![1]);

    var marker = new google.maps.Marker({
      position: { lat: <number>lat, lng: <number>lng },
      map: this.map,
      icon: icon(request.priority_type == 'high' ? 'red' : 'orange'),
    });
    this.markers.push(marker);
    marker.addListener('click', function () {
      chooseRequest(request);
    });
  }
  ngOnInit(): void {
    console.log(this.requests);
    this.loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: this.StorageService.getLocation(),
        zoom: 15,
        styles: environment.mapStyle,
      });
      this.infoWindow = new google.maps.InfoWindow();
      this.requests?.forEach((request) => {
        this.addMarker(request, this.chooseRequest.bind(this));
      });
    });


  }

  chooseRequest(request: ISOSRequest) {
    const dialogRef = this.bottomsheet.open(RequestCardDetailsComponent, {
      data: request,
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.setMapOnAll(null);
    this.markers = [];
    this.requests?.forEach((request) => {
      this.addMarker(request, this.chooseRequest.bind(this));
    });
  }
}
