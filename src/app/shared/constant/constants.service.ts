import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  mapPriority = new Map();
  mapStatus = new Map();
  public STORAGE_KEY = {
    AMIN_INFO: 'admin_info',
    USER_INFO: 'user_info',
    AUTH_TOKEN: 'token',
  };
  public MAP_PRIORITY=this.mapPriority;
  public MAP_STATUS=this.mapStatus;
  constructor() {
    this.mapPriority.set('red', 'red');
    this.mapPriority.set('orange', 'orange');
    this.mapPriority.set('yellow', 'yellow');
  }
}
