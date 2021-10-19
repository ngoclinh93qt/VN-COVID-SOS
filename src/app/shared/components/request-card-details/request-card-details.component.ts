import { GeneralService } from './../../../core/services/general.service';
import { ConstantsService } from 'src/app/shared/constant/constants.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { NewsService } from 'src/app/core/http/news.service';
import { SupportObjectService } from '../../../core/http/support-object.service';
import { TransFormComponent } from './../trans-form/trans-form.component';
import { SupportTransService } from '../../../core/http/support-trans.service';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { FormsModule } from '@angular/forms';
import { SupportTypesService } from '../../../core/http/support-types.service';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ProposeRequestComponent } from './propose-request/propose-request.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../notification/notification.service';
import * as dayjs from 'dayjs';
import { group } from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';
import { S3Service } from 'src/app/core/services/s3.service';
import { RequestFormComponent } from 'src/app/modules/urgent-request/request-form/request-form.component';
import {MatDayjsDateModule, MAT_DAYJS_DATE_ADAPTER_OPTIONS } from '@tabuckner/material-dayjs-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-request-card-details',
  templateUrl: './request-card-details.component.html',
  styleUrls: ['./request-card-details.component.scss'],
})
export class RequestCardDetailsComponent implements OnInit {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;
  supporters: any[] = [];
  lastestComment: { content: string; postTime: string }[] | undefined;
  request: ISOSRequest;
  new_status: String = '';
  cur_status?: String;
  isOpen: boolean = false;
  mapStatus!: Map<string, IBaseStatus>;
  mapSupportStatus!: Map<string, IBaseStatus>;
  mapPriority: any;
  news: INew[] = [];
  user: any;
  create_time: string = '';
  trans: ITransaction[] = [];
  supportObject: ISupport[] = [];
  defaultComment: INew;
  preUploadFile: any;
  file: any;
  isActive: boolean = false;
  editable: boolean = false;
  onClose() {
    console.log(this.request)
    this.bottomRef.dismiss(this.request);
  }
  mark($event: any, action?: string) {
    console.log(action);
    $event.stopPropagation();
    $event.preventDefault();
    this.urgentRequestService.markRequest(this.request?.id, {
      bookmarker_type: 'user',
      action: action,
      bookmarker_id: this.user.id,
    }).subscribe((res) => {
      if (action === 'bookmark') {
        console.log(true);
        this.request!.is_bookmarked = true;
      } else {
        console.log('else');
        this.request!.is_bookmarked = false;
      }
    });
  }

  constructor(
    public bottomRef: MatBottomSheetRef<RequestCardDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: { request: ISOSRequest, session: string },
    public dialog: MatDialog,
    private SupportTransService: SupportTransService,
    private NewsService: NewsService,
    private SupportObjectService: SupportObjectService,
    private urgentRequestService: UrgentRequestService,
    private StorageService: StorageService,
    public constantsService: ConstantsService,
    private storageService: StorageService,
    private notification: NotificationService,
    private generalService: GeneralService,
    private s3Service: S3Service
  ) {
    this.request = data.request

    this.cur_status = this.request.status
    this.defaultComment = {
      subject: 'new_comment',
      content: '',
      medias: [],
      target_type: 'sos_request',
      target_id: this.request.id,
    };
    if (this.isOpen = this.request.status === 'open') {
      this.isOpen = true;
    }
    this.supportObject = this.SupportObjectService.getSupportObjectByType(
      this.request.support_types!
    );
    this.initalize();
    this.fetchInit();
  }
  openRequestForm(): void {
    const dialogRef = this.dialog.open(RequestFormComponent, {
      width: 'auto',
      data: { action: 'update', request: this.request },
      disableClose: true,
      maxWidth: '100vw'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return
      }
      this.request = result;
    });
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.preUploadFile = event.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  show(data: any) {
    let content = data.value;
    if (!this.storageService.userInfo) {
      this.notification.error("Hãy đăng nhập hoặc đăng kí để được bình luận")
      return
    }
    if (content) {
      if (!this.preUploadFile) {
        this.NewsService.create(
          { ...this.defaultComment, content: content },
          {}
        ).subscribe((res) => (this.news = [res, ...this.news]));
      }
      else {
        this.s3Service.uploadImage(this.file).subscribe((res) => {
          if (res) {
            let fetchData = {
              mime_type: 'image',
              url: res
            }
            this.NewsService.create(
              { ...this.defaultComment, content: content, medias: [fetchData] },
              {}
            ).subscribe((res) => (this.news = [res, ...this.news]));
          }
        });
      }
    }
    data.value = '';
    this.preUploadFile = null;
  }
  fetchInit() {
    this.SupportTransService.getRequestTrans(this.request.id).subscribe(
      (result) => (this.trans = result)
    );
    this.NewsService.getRequestNews(this.request.id).subscribe(
      (res) => (this.news = res)
    );
  }
  initalize() {
    this.mapPriority = this.constantsService.MAP_PRIORITY;
    if (!!!this.data.session) this.data.session = this.constantsService.SESSION.DEFAULT;
    this.mapStatus = this.constantsService.MAP_SESSION_STATUS.get(this.data.session)!;

  }

  openDialog(): void {
    if (!this.StorageService.token) {
      this.notification.error('Đăng nhập hoặc đăng kí để tham gia.');
      return;
    }
    const dialogRef = this.dialog.open(JoinRequestComponent, {
      data: { request_id: this.request.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        this.request = result
      }
    });
  }

  getStatusView(map: Map<string, IBaseStatus>): string {
    return map.get(this.request?.status || '')?.status_view || ''
  }

  getStatusSteps(map: Map<string, IBaseStatus>): string[] {
    return map.get(this.request?.status || '')?.next_step || []
  }

  getStatusString(map: Map<string, IBaseStatus>): string {
    return map.get(this.request?.status || '')?.status || '';
  }
  updateRequestStatus(item: string) {
    const status = this.mapStatus.get(item)?.status || ''
    this.urgentRequestService.updateRequestStatus(
      this.request.id || '',
      {
        status,
        note: ''
      }
    ).subscribe(result => {
      this.request = result
      this.notification.success("Đã cập nhật trạng thái")
    }, err => this.notification.error("Cập nhật trạng thái bị lỗi"));
  }

  openProposeDialog(): void {
    const dialogRef = this.dialog.open(ProposeRequestComponent, {
      data: this.request,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result){
        this.request = result
      }
    })
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { request_id: this.request.id, status: this.request.status },
    });
  }
  setStatus(status: string): void {
    this.new_status = status;
  }
  confirmStatus(): void {
    this.urgentRequestService.verifyRequest(this.request.id, {
      status: 'verified',
    }).subscribe((res) => {
      this.notification.success("Đã xác thực yêu cầu");
      this.request = res;
    }, er => this.notification.error("Xác thực yêu cầu bị lỗi"));
  }
  openTransDialog(): void {
    const dialogRef = this.dialog.open(TransFormComponent, {
      data: {
        supportObject: this.supportObject,
        request_id: this.request.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) this.trans.push(result);
    });
  }

  length = 0;
  pageSize = 1;

  // MatPaginator Output
  pageEvent: PageEvent = new PageEvent();
  distance: string = ''
  ngOnInit(): void {
    this.length = this.request?.medias?.length!;
    this.pageEvent!.pageIndex = 0;
    this.user = this.StorageService.userInfo;
    this.create_time = this.generalService.diffDate(new Date(this.request?.created_time!))
    const RLocation = this.request?.location?.split(',')
    const CLocation = this.StorageService.location;
    this.distance = this.generalService.getDistanceFromLatLonInKm(parseFloat(RLocation![0]), parseFloat(RLocation![1]), CLocation.lat, CLocation.lng);
    this.editable = this.data.request?.requester_info?.id === this.user?.id
  }
}


export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'join',
  templateUrl: './joinForm.html',
  providers: [
    { provide: MAT_DAYJS_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class JoinRequestComponent {
  supportTypes: ISupportType[] = [];
  type: string = 'user';
  groups: any[] = [];
  support_date = dayjs();

  joinForm = new FormGroup({
    type: new FormControl('user'),
    support_date: new FormControl(dayjs()),
    description: new FormControl(''),
    is_support_all: new FormControl(true),
    supporter_id: new FormControl('')
  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JoinRequestComponent>,
    private SupportTypesService: SupportTypesService,
    private urgentRequestService: UrgentRequestService,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {
    this.SupportTypesService.findAll().subscribe(
      (result) => (this.supportTypes = result)
    );
    this.groups = this.storageService.userInfo?.groups || []

  }
  async onSubmit() {

    const body: any = {}
    Object.assign(body, this.joinForm.value)
    body.support_date = body.support_date.format('YYYY-MM-DDTHH')
    body.supporter_id = this.joinForm.value.type === 'user' ? this.storageService.userInfo?.id : this.joinForm.value.supporter_id;

    this.urgentRequestService.join(
      this.data.request_id,
      body
    ).subscribe((result) => {
      this.notificationService.success("Bạn đã tham gia hổ trợ")
      this.dialogRef.close(result);
    }, err => this.notificationService.error("Tham gia hổ trợ bị lỗi"));
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
