import { Blocked } from 'src/app/pages/blocked/model/blocked.model';

import { VolunteerGroupService } from './../../../core/services/rest-services/volunteer-group.service';
import { BlockedService } from 'src/app/core/services/rest-services/blocked.service';
import { HospitalService } from 'src/app/core/services/rest-services/hospital.service';
import { UrgentRequestService } from './../../../core/services/rest-services/urgent-request.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss']
})
export class GeneralDataComponent implements OnInit {

  UrgentRequestGeneral: IUrgentRequestGeneral = {};
  HospitalGeneral: IHospitalGeneral = {};
  BlockedGeneral: IBlockedGeneral = {};
  VolunteerGroupGeneral: IVolunteerGroupGeneral = {};
  constructor(private urgentRequestService: UrgentRequestService, private HospitalService: HospitalService,
    private BlockedService: BlockedService, private VolunteerGroupService: VolunteerGroupService) {
    this.UrgentRequestGeneral = urgentRequestService.getGeneralData();
    this.HospitalGeneral = HospitalService.getGeneralData();
    this.BlockedGeneral = BlockedService.getGeneralData();
    this.VolunteerGroupGeneral = this.VolunteerGroupService.getGeneralData();

  }

  ngOnInit(): void {
    // this.notifSv.infoNotification()
  }
}
