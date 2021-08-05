import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blocked } from 'src/app/pages/blocked/model/blocked.model';

import { RestService } from '../rest.service';
@Injectable({
  providedIn: 'root'
})
export class VolunteerGroupService extends RestService<IUrgentRequest>{
  public model: any;
  constructor(http: HttpClient) {
    super(http, '')

  }
  getGeneralData() {
    var res: IVolunteerGroupGeneral = {
      numGroup: this.getNumVolunteerGroups()
    }
    return res
  }
  getNumVolunteerGroups() {
    return this.volunteerGroups.length;
  }
  volunteerGroups: IVolunteerGroup[] = [
    {
      id: "1",
      name: "Group 1",
      numVolunteer: 10
    },
    {
      id: "2",
      name: "Group 2",
      numVolunteer: 10
    },
    {
      id: "3",
      name: "Group 3",
      numVolunteer: 10
    },
    {
      id: "4",
      name: "Group 4",
      numVolunteer: 10
    },
    {
      id: "5",
      name: "Group 5",
      numVolunteer: 10
    },
  ];
}
