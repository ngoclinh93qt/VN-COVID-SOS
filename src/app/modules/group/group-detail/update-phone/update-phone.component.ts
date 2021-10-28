import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmCodeService } from 'src/app/core/http/confirm-code.service';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

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
    private GroupService: VolunteerGroupService,
    private notification: NotificationService,
    private confirmCode: ConfirmCodeService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.fetchdata = this.group.cur_phone;
    }, 0);
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  async onSubmit(data: any) {
    this.GroupService.update(this.group.id, data, {}).subscribe((data: any)=>{
      if(data){
        this.notification.success("Sửa thông tin thành công");
        this._dialogRef.close({data: data});
        return;
      }
      this.notification.error("Sửa thông tin thất bại");
    });
  }

  ngOnInit(): void {}

  requestConfirm(phone: string){
    this.notification.info("Xin vui lòng chờ trong giây lát chúng tôi sẽ gửi mã xác nhận tới số điện thoại của bạn", 10000)
    this.confirmCode.requestCode(phone).subscribe()
  }
}
