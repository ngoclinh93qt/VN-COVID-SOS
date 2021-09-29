import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmCodeService extends RestService<{phone_number: string, confirm_code?: string}> {

  constructor(http: HttpClient) {
    super(http, '');
   }

  requestCode(phone: string){
    return this.http.post(`${this.host}/confirm_code`, {phone_number: phone, debug: !environment.production})
  }
}
