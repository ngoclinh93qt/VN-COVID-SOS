import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';

@Component({
  selector: 'app-update-phone',
  templateUrl: './update-phone.component.html',
  styleUrls: ['./update-phone.component.scss'],
})
export class UpdatePhoneComponent implements OnInit {
  fetchdata:string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private _dialogRef: MatDialogRef<UpdatePhoneComponent>,
    private GroupService: VolunteerGroupService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.fetchdata = this.group.cur_phone;
    }, 0);
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  checkSubmit(data: any) {
    if (data.status == 'VALID') this.CloseDialog();
  }

  async onSubmit(data: string) {
    console.log(data);
    this.GroupService.update(this.group.id, data, {}).subscribe();
  }

  ngOnInit(): void {}
}
