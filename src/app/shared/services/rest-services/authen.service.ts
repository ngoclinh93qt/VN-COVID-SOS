import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ISignIn, IUser } from 'src/typings';
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


  signin(username: string, password: string) {
    const root = environment.host;
    const signinUrl = `${root}/auth`;
    const body: Partial<ISignIn> = {
      username, // 'linh@3exp8.com',
      password, // '1234'
      grant_type: "password", 
       scope: "USER"
    };
    return this.http.post(signinUrl, body).pipe(
      map((res: any) => {
        console.log(res)
        
        this.accessToken = res.auth_token
        this._isLoggedIn = true;
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
