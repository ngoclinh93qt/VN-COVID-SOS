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
  user: any;
  mobileScreen: string = "MAP"
  constructor(

    private StorageService: StorageService
  ) { }
  toggleMap() {
    if (this.mobileScreen==='MAP') this.mobileScreen="REQUESTS"; else this.mobileScreen='MAP'
  }
  ngOnInit(): void {
    this.user = this.StorageService.userInfo;

  }
}
