import { Blocked } from 'src/app/modules/blocked/model/blocked.model';

import { Component, OnInit } from '@angular/core';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { BlockedService } from 'src/app/core/http/blocked.service';
import { HospitalService } from 'src/app/core/http/hospital.service';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrls: ['./general-data.component.scss'],
})
export class GeneralDataComponent implements OnInit {
  UrgentRequestGeneral: IUrgentRequestGeneral = {};
  HospitalGeneral: IHospitalGeneral = {};
  BlockedGeneral: IBlockedGeneral = {};
  VolunteerGroupGeneral: IVolunteerGroupGeneral = {};
  constructor(
    private urgentRequestService: UrgentRequestService,
    private hospitalService: HospitalService,
    private BlockedService: BlockedService,
    private VolunteerGroupService: VolunteerGroupService
  ) {
    this.UrgentRequestGeneral = urgentRequestService.getGeneralData();
    this.HospitalGeneral = hospitalService.getGeneralData();
    this.BlockedGeneral = BlockedService.getGeneralData();
    this.VolunteerGroupGeneral = this.VolunteerGroupService.getGeneralData();

    console.log('request');
    this.VolunteerGroupService.findAll().subscribe((result) => {
      console.log(result);
    });
  }

  ngOnInit(): void {
    // this.notifSv.infoNotification()
  }
}
