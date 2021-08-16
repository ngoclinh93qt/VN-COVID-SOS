import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-request-card-details',
  templateUrl: './request-card-details.component.html',
  styleUrls: ['./request-card-details.component.scss']
})
export class RequestCardDetailsComponent implements OnInit {
  @Output() close = new EventEmitter();
  lastestComment: { content: string; postTime: string; }[];
  historyComment: { content: string; postTime: string; }[];
  postList: ({ title: string; url: string; author: string; postTime: string; } | { title: string; author: string; postTime: string; url?: undefined; })[];

  constructor(public dialogRef: MatDialogRef<RequestCardDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public request: ISOSRequest) {
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
  status = "Rất Nguy Cấp";
  typeRequest = "Y tế";
  onclose() {
    this.close.emit();
    console.log("close");
  }
  length = 0;
  pageSize = 1;

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent;


  ngOnInit(): void {
    if (this.request?.status != 'RẤT NGUY CẤP') { this.status = "Nguy Cấp" }
    if (this.request?.support_types?.length != 0) this.typeRequest = this.request?.support_types?.[0]?.name!;
    this.length = this.request?.medias?.length!;
    this.pageEvent!.pageIndex = 0;
  }

}
