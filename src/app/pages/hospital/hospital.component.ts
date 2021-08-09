import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { HospitalService } from 'src/app/shared/services/rest-services/hospital.service';
import { Hospital } from './model/hospital.mode';
import { HospitalSidenavComponent } from './hospital-sidenav/hospital-sidenav.component';
import {
  MatBottomSheet,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  gridColumns = 2;
  hospitals: IHospital[] = [];

  constructor(
    private hospitalService: HospitalService,
    private notifSv: NotificationService,
    private _bottomSheet: MatBottomSheet
  ) {
    hospitalService.findAll();
    this.hospitals = hospitalService.hospitals;
  }

  openBottomSheet(): void {
    this._bottomSheet.open(HospitalSidenavComponent);
  }

  ngOnInit(): void {
    // this.notifSv.infoNotification()
  }
}
