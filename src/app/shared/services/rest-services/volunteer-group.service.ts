import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blocked } from 'src/app/pages/blocked/model/blocked.model';

import { RestService } from '../rest.service';
@Injectable({
  providedIn: 'root'
})
export class VolunteerGroupService extends RestService<IVolunteerGroup>{

  constructor(http: HttpClient) {
    super(http, 'groups')

  }
  getGeneralData() {
    var res: IVolunteerGroupGeneral = {
      numGroup: this.getNumVolunteerGroups()
    }
    return res
  }
  getNumVolunteerGroups() {
    return 1;
  }
}
