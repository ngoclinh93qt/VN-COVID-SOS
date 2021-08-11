import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { HospitalService } from 'src/app/shared/services/rest-services/hospital.service';
import { IHospital } from 'src/typings';
import { Hospital } from './model/hospital.mode';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  gridColumns = 2;
  hospitals: IHospital[] = [];

  constructor(private hospitalService: HospitalService, private notifSv: NotificationService) {
    hospitalService.findAll()
    this.hospitals = hospitalService.hospitals;
  }

  ngOnInit(): void {
   // this.notifSv.infoNotification()
  }
}
