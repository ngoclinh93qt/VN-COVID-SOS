import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.scss'],
})
export class UpdateNameComponent implements OnInit,AfterViewInit {
  dataFetch: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private _dialogRef: MatDialogRef<UpdateNameComponent>,
    private GroupService: VolunteerGroupService,
    private notification: NotificationService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataFetch = this.group.cur_name;
    }, 0);
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  async onSubmit(data: string) {
    this.GroupService.update(this.group.id, data, {}).subscribe((data: any)=>{
      if(data){
        this._dialogRef.close({data: data});
        this.notification.success("Sửa thông tin thành công");
        return;
      }
      this.notification.error("Sửa thông tin thất bại");
    });
  }

  ngOnInit(): void {}
}
