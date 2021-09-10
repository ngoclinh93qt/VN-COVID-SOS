import { Component, OnInit, Inject } from '@angular/core';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';

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
    console.log(data, this.data.request_id);
    this.UrgentRequestService.propose(this.data.request_id, data).subscribe(
      (result) => {
      }
    );
  }
}
