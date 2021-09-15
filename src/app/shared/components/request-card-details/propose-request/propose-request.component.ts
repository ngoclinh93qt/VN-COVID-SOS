import { Component, OnInit, Inject } from '@angular/core';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'app-propose-request',
  templateUrl: './propose-request.component.html',
  styleUrls: ['./propose-request.component.scss'],
})
export class ProposeRequestComponent implements OnInit {
  groups: IVolunteerGroup[] = [];

  constructor(
    private _dialogRef: MatDialogRef<ProposeRequestComponent>,
    private VolunteerGroupService: VolunteerGroupService,
    private UrgentRequestService: UrgentRequestService,
    private notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fetchInit();
  }

  ngOnInit(): void {}

  fetchInit() {
    this.VolunteerGroupService.findAll().subscribe((result) => {
      this.groups = result;
    });
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  checkSubmit(data: any) {
    if (data.status == 'VALID') this.CloseDialog();
  }

  async onSubmit(data: any) {
    data.target_type = 'group';
    data.target_id = data.target_id
    this.UrgentRequestService.propose(this.data.request_id, data).subscribe(
      (result) => {
        this.notification.success("Đã đề xuất cho nhóm")
      }
    );
  }
}
