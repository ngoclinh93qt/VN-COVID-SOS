import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService extends RestService<IUser> {
  constructor(http: HttpClient) {
    super(http, '');
  }

  signup(
    username: string,
    password: string,
    phone_number: string,
    first_name: string,
    last_name: string
  ) {
    const root = environment.host;
    const signupUrl = `${root}/customers`;
    const body = {
      username: username,
      password: password,
      phone_number: phone_number,
      first_name: first_name,
      last_name: last_name,
     // debug: 'true',
    };

    return this.http.put(signupUrl, body).pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  }
}
