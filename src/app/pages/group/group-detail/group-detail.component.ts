import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {
  postList: IHospitalPost[];
  closeBottomSheet(): void {
    this._bottomSheetRef.dismiss();
  }

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<GroupDetailComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public group: IVolunteerGroup
  ) {
    this.postList = [
      {
        title: 'Đã hỗ trợ 1000 khẩu trang, 300 đồ bảo hộ cho bệnh viện q1',
        url: 'https://picsum.photos/300/200',
        postTime: '10:30 AM . Hôm nay',
      },
      {
        title: 'Hôm nay nhóm đã gửi đên: 100 giường bệnh, 200 khẩu trang',
        postTime: '10:30 AM . Hôm nay',
      },
    ];
  }

  ngOnInit(): void {}
}
