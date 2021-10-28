import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmCodeService } from 'src/app/core/http/confirm-code.service';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private _dialogRef: MatDialogRef<DeleteGroupComponent>,
    private GroupService: VolunteerGroupService,
    private router: Router,
    private notification: NotificationService,
    private confirmCode: ConfirmCodeService
  ) { }

  ngOnInit(): void {
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  async deleteGroup(){
    this.GroupService.delete(this.group.id).subscribe((data: any) => {
      if(data){
        this.notification.success("Xoá nhóm thành công");
        this._dialogRef.close({data: data});
        return;
      }
      this.notification.error("Xoá nhóm thất bại");
    });
  }

  requestConfirm(phone: string){
    this.notification.info("Xin vui lòng chờ trong giây lát chúng tôi sẽ gửi mã xác nhận tới số điện thoại của bạn", 10000)
    this.confirmCode.requestCode(phone).subscribe()
  }
}
