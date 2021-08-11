import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequesterObjectStatus } from 'src/typings';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class RequesterObjectStatusService extends RestService<IRequesterObjectStatus> {

  constructor(http: HttpClient) {
    super(http, 'configurations?filter_type=system&filter_group=requester_object_status&sort_order=asc')

  }
}
