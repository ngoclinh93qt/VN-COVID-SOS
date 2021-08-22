import { UrgentRequestService } from 'src/app/shared/services/rest-services/urgent-request.service';
import { FormsModule } from '@angular/forms';
import { SupportTypesService } from './../../services/rest-services/support-types.service';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-request-card-details',
  templateUrl: './request-card-details.component.html',
  styleUrls: ['./request-card-details.component.scss'],
  
})
export class RequestCardDetailsComponent implements OnInit {

  lastestComment: { content: string; postTime: string; }[];
  mapPriority = new Map();
  mapStatus = new Map();
  postList: ({ title: string; url: string; author: string; postTime: string; } | { title: string; author: string; postTime: string; url?: undefined; })[];

  onClose() {
    this.dialogRef.close();
  }
  constructor(public dialogRef: MatDialogRef<RequestCardDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public request: ISOSRequest, public dialog: MatDialog) {
    this.mapPriority.set("high", "Rất nguy cấp");
    this.mapPriority.set("normal", "Nguy cấp")
    this.mapPriority.set("", "Nguy cấp")
    this.mapStatus.set("", "Đang chờ hỗ trợ");
    this.mapStatus.set("waiting", "Đang chờ hỗ trợ");
    this.mapStatus.set("supporting", "Đang được hỗ trợ");
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
  openDialog(): void {
    const dialogRef = this.dialog.open(JoinRequestComponent, {
      data: {request_id:this.request.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
  length = 0;
  pageSize = 1;

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent;


  ngOnInit(): void {
    this.length = this.request?.medias?.length!;
    this.pageEvent!.pageIndex = 0;
  }

}
@Component({
  selector: 'join',
  templateUrl: './joinForm.html',
  providers: [MatFormFieldModule,FormsModule]
})
export class JoinRequestComponent {
  supportTypes: ISupportType[] = [];
  joinRequest: IJoinRequest = { type: "user", supporter_id: "customerc74de9034800804c5be2197f986ec520" }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JoinRequestComponent>, private SupportTypesService: SupportTypesService,private UrgentRequestService:UrgentRequestService) {
    this.SupportTypesService.findAll().subscribe(result => this.supportTypes = result)
  }
  async onSubmit(data: any) {
    console.log(data);
    this.joinRequest.description=data.description;
    this.joinRequest.support_date=data.support_date;
    console.log(this.joinRequest);
    this.UrgentRequestService.join(this.data.request_id,this.joinRequest).subscribe();
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}