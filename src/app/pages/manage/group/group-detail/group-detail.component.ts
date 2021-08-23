import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { UpdateNameComponent } from './update-name/update-name.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {
  lastestComment: { content: string; postTime: string }[];

  postList: (
    | { title: string; url: string; author: string; postTime: string }
    | { title: string; author: string; postTime: string; url?: undefined }
  )[];
  onClose() {
    this.dialogRef.close();
  }

  openUpdateName(cur_name: any, id: any) {
    this.dialog.open(UpdateNameComponent, {
      data: { cur_name: cur_name, id: id },
    });
  }

  openUpdatePhone(cur_phone: any, id: any) {
    this.dialog.open(UpdatePhoneComponent, {
      data: { cur_phone: cur_phone, id: id },
    });
  }

  openUpdateAddress(id: any) {
    this.dialog.open(UpdateAddressComponent, {
      data: { id: id },
    });
  }
  constructor(
    public dialogRef: MatDialogRef<GroupDetailComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public group: IVolunteerGroup
  ) {
    this.lastestComment = [
      {
        content: 'Hôm nay đã gửi đến 200 giường bệnh, 1000 khẩu trang.',
        postTime: '10:30 AM . Hôm nay',
      },
      {
        content: 'Đã gửi đến 100 máy thở',
        postTime: '10:30 AM . Hôm nay',
      },
    ];

    this.postList = [
      {
        title: 'Hôm nay tại BV A, Đã hỗ trợ 200 giường bệnh',
        url: 'https://picsum.photos/300/200',
        author: 'Hai Nguyen',
        postTime: '10:30 AM . Hôm nay',
      },
      {
        title: 'Đã hỗ trợ 1000 khẩu trang, 300 đồ bảo hộ',
        author: 'Nguyễn Thị N . Nhóm thiện nguyện NTN',
        postTime: '10:30 AM . Hôm nay',
      },
    ];
  }

  ngOnInit(): void {}
}
