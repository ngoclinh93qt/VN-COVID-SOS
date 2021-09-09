import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
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
  ngOnInit(): void {}
}
