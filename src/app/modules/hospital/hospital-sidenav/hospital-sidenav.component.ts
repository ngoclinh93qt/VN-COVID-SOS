import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { StatusDialogComponent } from './status-dialog/status-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-hospital-sidenav',
  templateUrl: './hospital-sidenav.component.html',
  styleUrls: ['./hospital-sidenav.component.scss'],
})
export class HospitalSidenavComponent implements OnInit {
  lastestComment: IComment[];
  historyComment: IComment[];
  postList: IHospitalPost[];

  closeBottomSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  openDialog() {
    this.dialog.open(StatusDialogComponent);
  }

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<HospitalSidenavComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public hospital: IHospital,
    public dialog: MatDialog
  ) {
    this.lastestComment = [
      {
        content: 'Bệnh viện tạm thời không cần gì.',
        postTime: '10:30 AM . Hôm nay',
      },
      {
        content: 'Bệnh viện 100 may tho',
        postTime: '10:30 AM . Hôm nay',
      },
    ];
    this.historyComment = [
      {
        content: 'Bệnh viện tạm thời không cần gì.',
        postTime: '10:30 AM . Hôm nay',
      },
    ];
    this.postList = [
      {
        title: 'Hôm nay tại BV A.',
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
