import { Component, OnInit, Inject } from '@angular/core';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { NotificationService } from '../../notification/notification.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-propose-request',
  templateUrl: './propose-request.component.html',
  styleUrls: ['./propose-request.component.scss'],
})
export class ProposeRequestComponent implements OnInit {
  groups: IVolunteerGroup[] = [];
  request!: ISOSRequest;
  suggests: any[] = [];

  suggestForm!: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<ProposeRequestComponent>,
    private VolunteerGroupService: VolunteerGroupService,
    private UrgentRequestService: UrgentRequestService,
    private notification: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.request = data;
    this.suggests = this.request.suggests
    this.fetchInit();
    console.log(this.suggests)
    this.suggestForm = new FormGroup({
      targets: new FormControl(this.suggests.map(e => e.target_id)),
      note: new FormControl('')
    })
  }

  ngOnInit(): void {}

  fetchInit() {
    this.VolunteerGroupService.findAll().subscribe((result) => {
      this.groups = result
    });
  }

  CloseDialog(data?:any) {
    this._dialogRef.close(data);
  }

  isSuggested(id: string | undefined){
    return this.suggests.find(e => e.target_id == id)
  }

  async onSubmit(data: any) {
    data.targets = this.groups.filter(e => data.targets.includes(e.id)).map(e => {
      return {
        target_name: e.name,
        target_id: e.id,
        target_type: 'group'
      }
    })
    this.UrgentRequestService.propose(this.request.id, data).subscribe(
      (result) => {
        this.notification.success("Đã đề xuất cho nhóm")
        this.CloseDialog(result)
      }
    );
  }
}
