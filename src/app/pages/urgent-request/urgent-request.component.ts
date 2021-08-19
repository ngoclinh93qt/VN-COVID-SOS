import { RequesterObjectStatusService } from './../../shared/services/rest-services/requester-object-status.service';
import { SupportTypesService } from './../../shared/services/rest-services/support-types.service';
import { RequestCardDetailsComponent } from './../../shared/components/request-card-details/request-card-details.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { VolunteerGroupService } from './../../shared/services/rest-services/volunteer-group.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { UrgentRequestService } from 'src/app/shared/services/rest-services/urgent-request.service';

@Component({
  selector: 'app-urgent-request',
  templateUrl: './urgent-request.component.html',
  styleUrls: ['./urgent-request.component.scss']
})
export class UrgentRequestComponent implements OnInit {
  requests: ISOSRequest[] = [];

  constructor(public dialog: MatDialog, private UrgentRequestService: UrgentRequestService,
    private SupportTypesService: SupportTypesService, private RequesterObjectStatusService: RequesterObjectStatusService) {
    this.fetchInit()
  }
  fetchInit() {
    this.UrgentRequestService.findAll().subscribe(result => {
      this.requests = result
      console.log(result);
    })
  }
  searchRequest(data: any) {
    console.log(data);
    this.UrgentRequestService.search(data).subscribe(result => {
      this.requests = result
      console.log(result);
    })
  }
  openFormDialog(): void {
    const dialogRef = this.dialog.open(RequestFormComponent, {
      width: 'auto',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }


  chooseRequest(request: ISOSRequest) {
    const dialogRef = this.dialog.open(RequestCardDetailsComponent, {
      width: '100vw',
      height: '100vh',
      data: request
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  setLocation() {
    let location = localStorage.getItem("location");
    if (!location) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        localStorage.setItem("location", JSON.stringify({ lat: lat, long: long }));
      });
    }

  }
  ngOnInit(): void {
    this.setLocation();
  }

}

