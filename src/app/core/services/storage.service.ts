import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ConstantsService } from '../../shared/constant/constants.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {

  public locationSubject = new Subject<ILocation>();
  constructor(private constant: ConstantsService) {
  }
  public get location(): any | undefined {
    let result = localStorage.getItem(this.constant.STORAGE_KEY.LOCATION);
    if (result) {
      return JSON.parse(result);
    }
    return this.constant.DEFAULT_LOCATION.HoChiMinh;
  }
  public set location(value: any | undefined) {
    if (value) {
      localStorage.setItem(
        this.constant.STORAGE_KEY.LOCATION,
        JSON.stringify(value)
      );
      this.locationSubject.next(value)
    }
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
