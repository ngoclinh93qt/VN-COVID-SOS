import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/http/users.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { LocationService } from 'src/app/shared/subjects/location.service';
import { RequestFormComponent } from '../urgent-request/request-form/request-form.component';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit, OnDestroy {

  clinics: IGroup[] = [];
  user: any;
  mobileScreen: string = "MAP"
  subscriptionUser: Subscription | undefined
  _isCanPick = false;
  _pickedSearchLocation?: google.maps.LatLng;


  constructor(
    public dialog: MatDialog,
    private storage: StorageService,
    private userService: UsersService,
    private locationService: LocationService
  ) { }
  ngOnDestroy(): void {
    this.subscriptionUser?.unsubscribe();
  }
  openCreateForm(): void {
    const dialogRef = this.dialog.open(ClinicFormComponent, {
      width: 'auto',
      data: { action: "create" },
      disableClose: true,
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.clinics = this.clinics ? [result, ...this.clinics] : [result];
    });
  }
  toggleMap() {
    if (this.mobileScreen === 'MAP') this.mobileScreen = 'CLINICS';
    else this.mobileScreen = 'MAP';
  }
  ngOnInit(): void {
    this.user = this.storage.userInfo;
    // this.locationService.updateLocation();
    this.subscriptionUser = this.userService.userSubject.subscribe({
      next: (user) => {
        this.user = user;
        console.log(user);
      },
    });
  }
  onPickNewLocation(event: google.maps.LatLng) {
    this._pickedSearchLocation = event;

  }
  isCanPick(event: boolean) {
    this._isCanPick = event;
  }
}
