import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class SupportTypesService extends RestService<ISupportType> {
  constructor(http: HttpClient) {
    super(http, 'support_types');
  }
}
