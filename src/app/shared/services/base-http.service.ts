import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  constructor(private http: HttpClient, private notification: NotificationService) { }
  get (url: string, options: any){
    return this.request("GET", url, options);
  }

  post(url: string, options: any) {
    return this.request("GET", url, options);
  }

  put(url: string, options: any){
    return this.request("GET", url, options);
  }

  delete(url: string, options: any){
    return this.request("GET", url, options);
  }

  private request<T>(method: string, url: string, options: any): Observable<HttpEvent<T>>{
    return this.http.request<T>(method, url, options);
  }


}
