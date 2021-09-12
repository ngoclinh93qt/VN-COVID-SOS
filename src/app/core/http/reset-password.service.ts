import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService extends RestService<IUser> {

  constructor(http: HttpClient) {
    super(http, '');
  }

  forgotPassword(phoneNumber: string) {
    const url = `${this.host}/forgot`;
    const body = {
      phone_number: phoneNumber
    };

    return this.http.post(url, body).pipe(
      tap((res) => {
        console.log(res);
      })
    );
  }
}
