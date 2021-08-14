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
  focusRequest: ISOSRequest = {};
  constructor(public dialog: MatDialog, private UrgentRequestService: UrgentRequestService,
    private VolunteerGroupService: VolunteerGroupService) {
    this.UrgentRequestService.findAll().subscribe(result => {
      this.requests = result
      console.log(result);
    })
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(RequestFormComponent, {
      width: 'auto',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  chooseRequest(request: ISOSRequest) {
    this.focusRequest = request;
  }

  closeFocus() {
    this.focusRequest = {};
  }
  ngOnInit(): void {
  }

}

