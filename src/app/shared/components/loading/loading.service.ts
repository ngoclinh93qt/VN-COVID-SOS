import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loadingChanged = new Subject<boolean>();
  public static loads = 0;
  public static lastStatus = false;
  public loadStatus = this.loadingChanged.asObservable();
  constructor() {}

  start() {
    LoadingService.loads = LoadingService.loads < 0 ? 0 : LoadingService.loads;
    LoadingService.loads++;
    return this.getLoadStatus();
  }

  stop() {
    LoadingService.loads--;
    LoadingService.loads = LoadingService.loads < 0 ? 0 : LoadingService.loads;
    return this.getLoadStatus();
  }

  stopAll() {
    LoadingService.loads = 0;
    return this.getLoadStatus();
  }

  getLoadStatus() {
    let status: boolean = !!LoadingService.loads;
    if (LoadingService.lastStatus != status) {
      LoadingService.lastStatus = status;
      this.loadingChanged.next(status);
    }
    return status;
  }
}
