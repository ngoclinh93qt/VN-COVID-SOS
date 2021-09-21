import { AuthenService } from 'src/app/core/http/authen.service';
import { StorageService } from './../services/storage.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { RestService } from './rest.service';
@Injectable({
  providedIn: 'root',
})
export class UsersService extends RestService<IUser> {
  userSubject = new Subject<IUser>();
  constructor(http: HttpClient, private StorageService: StorageService, private authService: AuthenService) {
    super(http, 'users');
  }


  confirm(body: IUser, options: any): Observable<any> {
    return this.http
      .post<{ data: any; auth_token: any }>(`${this.host}/users/confirm`, body)
      .pipe(
        map((res) => {
          this.StorageService.token = res.auth_token;
          return res.data;
        })
      );
  }
  resendCode(body: IUser, options: any): Observable<IUser> {
    return this.http
      .post<{ data: IUser }>(`${this.host}/users/resend`, body)
      .pipe(map((res) => res.data));
  }
  updateProfile(body: IUser, options: any): Observable<IUser> {
    return this.http
      .post<{ data: IUser }>(`${this.host}/users/profile`, body)
      .pipe(
        map((res) => {
          this.StorageService.userInfo = res.data;
          this.userSubject.next(res.data)
          this.getProfile().subscribe();  //received object different form getProfile(); 
          return res.data;
        })
      );
  }
  getProfile(): Observable<IUser> {
    return this.http.get<{ data: IUser }>(`${this.host}/users/profile`).pipe(
      map((res) => {
        this.StorageService.userInfo = res.data;
        this.userSubject.next(res.data)
        return res.data
      }));
  }
  searchProfile(data: any) {
    return this.http
      .post<{ data: any }>(`${this.host}/users/search`, data)
      .pipe(
        map((res) => {
          return res.data;
        })
      );
  }
  forgotPassword(body: IUser, options: any): Observable<IUser> {
    return this.http
      .post<{ data: IUser }>(`${this.host}/forgot`, body)
      .pipe(map((res) => res.data));
  }
  resetPassword(body: IUser, options: any): Observable<IUser> {
    return this.http
      .post<{ data: IUser, auth_token: string, access_token: string }>(`${this.host}/reset`, body)
      .pipe(
        tap(res => this.authService.autoSignin(res.auth_token, res.data)),
        map((res) => res.data)
      );
  }
}
