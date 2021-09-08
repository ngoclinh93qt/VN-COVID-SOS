import { Component, OnInit, Inject } from '@angular/core';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  statusList: string[] = [];
  constructor(
    private _dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private UrgentRequestService: UrgentRequestService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    switch (this.data.status) {
      case 'open':
        this.statusList = ['verified', 'accepted', 'rejected'];
        break;
      case 'verified':
        this.statusList = ['accepted'];
        break;
      case 'accepted':
        this.statusList = ['executing'];
        break;
      case 're-open':
        this.statusList = ['rejected', 'verified', 'accepted'];
        break;
      case 'rejected':
        this.statusList = ['re-open'];
        break;
      case 'executing':
        this.statusList = ['resolved'];
        break;
    }
  }

  ngOnInit(): void {}

  CloseDialog() {
    this._dialogRef.close();
  }

  checkSubmit(data: any) {
    if (data.status == 'VALID') this.CloseDialog();
  }

  async onSubmit(data: any) {
    console.log(data);
    this.UrgentRequestService.verifyRequest(
      this.data.request_id,
      data
    ).subscribe((result) => {});
  }
}
