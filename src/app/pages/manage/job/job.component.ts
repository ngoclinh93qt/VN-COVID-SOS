import { UrgentRequestService } from 'src/app/shared/services/rest-services/urgent-request.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestCardDetailsComponent } from 'src/app/shared/components/request-card-details/request-card-details.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
  requests: ISOSRequest[] = [];
  constructor(
    public dialog: MatDialog,
    private UrgentRequestService: UrgentRequestService
  ) {
    this.fetchInit();
  }
  fetchInit() {
    this.UrgentRequestService.findAll().subscribe((result) => {
      this.requests = result;
      console.log(result);
    });
  }
  chooseRequest(request: ISOSRequest) {
    const dialogRef = this.dialog.open(RequestCardDetailsComponent, {
      width: '100vw',
      height: '100vh',
      data: request,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  ngOnInit(): void {}
}
