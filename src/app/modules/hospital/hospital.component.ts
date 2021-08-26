import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { HospitalService } from 'src/app/core/http/hospital.service';

import { Hospital } from './model/hospital.mode';
import { HospitalSidenavComponent } from './hospital-sidenav/hospital-sidenav.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
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
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet
  ) {
    hospitalService.findAll();
    this.hospitals = hospitalService.hospitals;
  }

  openDialog() {
    this.dialog.open(CreateHospitalComponent);
  }

  openBottomSheet(hospital: IHospital): void {
    this._bottomSheet.open(HospitalSidenavComponent, {
      data: hospital,
    });
  }

  ngOnInit(): void {
    // this.notifSv.infoNotification()
  }
}
