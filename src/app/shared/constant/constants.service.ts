import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  public STORAGE_KEY = {
    AMIN_INFO: 'admin_info',
    USER_INFO: 'user_info',
    AUTH_TOKEN: 'token'
  };

  constructor() {}
}
