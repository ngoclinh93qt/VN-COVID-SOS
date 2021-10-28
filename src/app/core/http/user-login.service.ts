import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';
import { map } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoginService extends RestService<IUser> {
  accessToken: string | undefined | null;
  constructor(http: HttpClient, private storageService: StorageService) {
    super(http, 'customers');
  }

  getConfirmCode(phone_number: String) {
    const root = environment.host;
    const url = `${root}/customers`;
    const body = {
      phone_number: phone_number,
     // debug: 'true',
    };
    return this.http.put(url, body).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      })
    );
  }

  login(confirm_code: String, cusomter_id: String) {
    const root = environment.host;
    const url = `${root}/customers/${cusomter_id}/confirm`;
    const body = {
      confirm_code: confirm_code,
    };
    return this.http.post(url, body).pipe(
      map((res: any) => {
        console.log(res);
        this.accessToken = 'htY4154ZgbK1yQSUqtIszKDr3j82iBlV';
        this.storageService.token = res.auth_token;
        console.log(res.auth_token);
        return res;
      })
    );
  }
}
