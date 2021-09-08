import { Injectable } from '@angular/core';
import { ConstantsService } from '../../shared/constant/constants.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private constant: ConstantsService) {}

  public getLocation(): any {
    let location = localStorage.getItem('location');
    if (!location) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        localStorage.setItem(
          'location',
          JSON.stringify({ lat: lat, lng: long })
        );
      });
      return this.getLocation();
    }
    return JSON.parse(location!);
  }

  public get userInfo(): any | undefined {
    let result = localStorage.getItem(this.constant.STORAGE_KEY.USER_INFO);
    if (result) {
      return JSON.parse(result);
    }
    return;
  }
  public set userInfo(value: any | undefined) {
    if (value) {
      localStorage.setItem(
        this.constant.STORAGE_KEY.USER_INFO,
        JSON.stringify(value)
      );
    }
  }
  public get adminInfo(): ICustomerProfile | undefined {
    let result = localStorage.getItem(this.constant.STORAGE_KEY.AMIN_INFO);
    if (result) {
      return JSON.parse(result);
    }
    return;
  }
  public set adminInfo(value: ICustomerProfile | undefined) {
    if (value) {
      localStorage.setItem(
        this.constant.STORAGE_KEY.AMIN_INFO,
        JSON.stringify(value)
      );
    }
  }

  public get token(): string | undefined {
    let result = localStorage.getItem(this.constant.STORAGE_KEY.AUTH_TOKEN);
    if (result) {
      return result;
    }
    return;
  }
  public set token(value: string | undefined) {
    if (value) {
      localStorage.setItem(this.constant.STORAGE_KEY.AUTH_TOKEN, value);
    }
  }
}
