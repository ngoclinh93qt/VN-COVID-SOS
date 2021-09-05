import { StorageService } from './../services/storage.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';
import { SessionState } from './authen.service';
const notSignedInMessage = `Not signed in`;
@Injectable({
  providedIn: 'root'
})
export class UsersService extends RestService<IUser> {
  public host: string;
  constructor(http: HttpClient, private StorageService: StorageService) {
    super(http, 'users');
    this.host = environment.host;
  }

  confirm(body: IUser, options: any): Observable<any> {
    return this.http
      .post<{ data: any, auth_token: any }>(`${this.host}/users/confirm`, body)
      .pipe(map((res) => {
        this.StorageService.token = res.auth_token;
        return res.data
      }));
  }
  resendCode(body: IUser, options: any): Observable<IUser> {
    return this.http
      .post<{ data: IUser }>(`${this.host}/users/resend`, body)
      .pipe(map((res) => res.data));
  }
  updateProfile(body: IUser, options: any): Observable<IUser> {
    return this.http
      .post<{ data: IUser }>(`${this.host}/users/profile`, body)
      .pipe(map((res) => {
        this.StorageService.userInfo = res.data;
        return res.data
      }));
  }
}
