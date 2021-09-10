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
    this.mapPriority.set('high', 'Rất nguy cấp');
    this.mapPriority.set('normal', 'Nguy cấp');
    this.mapPriority.set('', 'Nguy cấp');
    this.mapStatus.set('', 'Đang chờ hỗ trợ');
    this.mapStatus.set('waiting', 'Đang chờ hỗ trợ');
    this.mapStatus.set('supporting', 'Đang được hỗ trợ');
  }
}
