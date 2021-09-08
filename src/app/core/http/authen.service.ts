import { StorageService } from 'src/app/core/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RestService } from './rest.service';

import { ConstantsService } from 'src/app/shared/constant/constants.service';

export interface SessionState {
  loggedIn: boolean;
  message: string;
}

const notSignedInMessage = `Not signed in`;

@Injectable({
  providedIn: 'root',
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

  constructor(
    http: HttpClient,
    private storage: StorageService,
    private constant: ConstantsService) {
    super(http, '');
  }

  signin(username: string, password: string) {
    const root = environment.host;
    const signinUrl = `${root}/auth`;
    const body: Partial<ISignIn> = {
      username, // '0349883326',
      password, // 'Linh123!'
      grant_type: 'password',
      scope: 'USER',
    };
    return this.http.post(signinUrl, body).pipe(
      map((res: any) => {
        console.log(res);
        this.storage.token=res.auth_token;
        this.storage.userInfo=res.data;
        this.accessToken = res.auth_token;
        this._isLoggedIn = true;
        return res.data;
      })
    );
  }

  refreshToken() {
    // TODO: implement a refresh
  }

  logout() {
    this.accessToken = null;
    localStorage.removeItem(this.constant.STORAGE_KEY.AUTH_TOKEN);
    localStorage.removeItem(this.constant.STORAGE_KEY.USER_INFO);
    this.sessionStateSubject.next({
      loggedIn: false,
      message: notSignedInMessage,
    });
    this._isLoggedIn = false;
  }
}
