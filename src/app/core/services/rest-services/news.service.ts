import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends RestService<INews> {

  constructor(http: HttpClient,) { 
    super(http, '')
  }
}
