import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../notification.service';
import { RestService } from '../rest.service';

export interface SessionState {
  loggedIn: boolean;
  message: string;
}

const notSignedInMessage = `Not signed in`;


@Injectable({
  providedIn: 'root'
})

export class AuthenService extends RestService<IUser> {
  private _isLoggedIn = false;
  private sessionStateSubject = new BehaviorSubject<SessionState>({
    loggedIn: false,
    message: notSignedInMessage,
  });
  accessToken: string | undefined | null;
  public get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  readOnly = false;
  sessionState$ = this.sessionStateSubject.asObservable();

  constructor(http: HttpClient) { 
    super(http, '')
  }


  signin(email: string, password: string) {
    const root = environment.host;
    const signinUrl = `${root}/signin/`;
    const body: Partial<IUser> = {
      email, // 'linh@3exp8.com',
      password, // '1234'
    };
    return this.http.post(signinUrl, body).pipe(
      map((res) => {
      
      })
    );
  }

  refreshToken() {
    // TODO: implement a refresh
  }

  logout() {
    this.accessToken = null;
    this.sessionStateSubject.next({ loggedIn: false, message: notSignedInMessage });
    this._isLoggedIn = false;
  }
}
