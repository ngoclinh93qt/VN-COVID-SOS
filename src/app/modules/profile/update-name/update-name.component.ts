import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/http/users.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.scss'],
})
export class UpdateNameComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public cur_name: any,
    private _dialogRef: MatDialogRef<UpdateNameComponent>,
    private usersService: UsersService,
    private notification: NotificationService
  ) {}

  CloseDialog() {
    this._dialogRef.close();
  }

  async onSubmit(data: IUser) {
    this.usersService.updateProfile(data, {}).subscribe((data: any) => {
      if (data) {
        this.notification.success('Chỉnh sửa thành công');
        this._dialogRef.close({ data: data });
        return;
      }
      this.CloseDialog();
      this.notification.error('Chỉnh sửa thất bại');
    });
  }

  ngOnInit(): void {
  }
}
