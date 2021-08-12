import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISignIn, IUser } from 'src/typings';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService extends RestService<IUser> {
  constructor(http: HttpClient) {
    super(http, '');
  }

  signup(username: string, password: string, phone_number: string) {
    const root = environment.host;
    const signupUrl = `${root}/users/create`;
    const body = {
      username: username,
      password: password,
      phone_number: phone_number,
    };

    return this.http.put(signupUrl, body).pipe(
      map((res: any) => {
        console.log(res);
      })
    );
  }
}
