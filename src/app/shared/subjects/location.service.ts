import { StorageService } from 'src/app/core/services/storage.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private storage: StorageService) { }
  public locationSubject = new Subject<ILocation>();
  public updateLocation(): any {
    var self = this;
    navigator.geolocation.getCurrentPosition(function (position: any) {
      let lat = position.coords.latitude;
      let long = position.coords.longitude;
      self.storage.location = { lat: lat, lng: long }
      self.locationSubject.next({ lat: lat, lng: long })
    });
  }

}
