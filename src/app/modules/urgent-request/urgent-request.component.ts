import { StorageService } from 'src/app/core/services/storage.service';
import { RequesterObjectStatusService } from '../../core/http/requester-object-status.service';
import { SupportTypesService } from '../../core/http/support-types.service';
import { RequestCardDetailsComponent } from './../../shared/components/request-card-details/request-card-details.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { VolunteerGroupService } from '../../core/http/volunteer-group.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-urgent-request',
  templateUrl: './urgent-request.component.html',
  styleUrls: ['./urgent-request.component.scss'],
})
export class UrgentRequestComponent implements OnInit {
  requests: ISOSRequest[] = [];
  userCreatedRequests: ISOSRequest[] = [];
  joinedRequests: ISOSRequest[] = [];
  groupSuggested: ISOSRequest[] = [];
  user: any;
  constructor(
    public bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private UrgentRequestService: UrgentRequestService,
    private SupportTypesService: SupportTypesService,
    private RequesterObjectStatusService: RequesterObjectStatusService,
    private StorageService: StorageService
  ) {
    this.user = StorageService.userInfo;
    this.fetchInit();
  }
  fetchInit() {
    this.UrgentRequestService.findAll().subscribe((result) => {
      this.requests = result;
      console.log(result);
    });
    if (this.user != null) {
      this.UrgentRequestService.getByRequesterId(this.user.user_id).subscribe((result) => {
        this.userCreatedRequests = result;
        console.log(result);
      });
      this.UrgentRequestService.getJoinedRequests(this.user.user_id).subscribe((result) => {
        this.joinedRequests = result;
        console.log(result);
      });
      this.user.groups.forEach((group:any) => {
        this.UrgentRequestService.getJoinedRequests(group.id).subscribe((result) => {
          this.groupSuggested = [...this.groupSuggested, ...result]
          console.log(result);
        });
      });

    }
  }
  searchRequest(data: any) {
    //console.log(data);
    this.UrgentRequestService.search(data).subscribe((result) => {
      this.requests = result.sos_requests;
     // console.log(result);
    });
  }
  openFormDialog(): void {
    const dialogRef = this.dialog.open(RequestFormComponent, {
      width: 'auto',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  chooseRequest(request: ISOSRequest) {
    this.bottomSheet.open(RequestCardDetailsComponent, {
      data: request,
    });

    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log('The dialog was closed');
    //   console.log(result);
    // });
  }
  setLocation() {
    let location = localStorage.getItem('location');
    if (!location) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        localStorage.setItem(
          'location',
          JSON.stringify({ lat: lat, lng: long })
        );
      });
    }
  }
  ngOnInit(): void {
    this.user = this.StorageService.userInfo;

  }
}
