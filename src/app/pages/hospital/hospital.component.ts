import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { HospitalService } from 'src/app/core/services/rest-services/hospital.service';
import { Hospital } from './model/hospital.mode';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  gridColumns = 3;
  hospitals: IHospital[] = [];

  constructor(private hospitalService: HospitalService, private notifSv: NotificationService) {
    hospitalService.findAll()
    this.hospitals = hospitalService.hospitals;
  }

  ngOnInit(): void {
   // this.notifSv.infoNotification()
  }
}
