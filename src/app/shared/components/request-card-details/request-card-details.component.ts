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

@Component({
  selector: 'app-request-card-details',
  templateUrl: './request-card-details.component.html',
  styleUrls: ['./request-card-details.component.scss'],
})
export class RequestCardDetailsComponent implements OnInit {
  
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | undefined;
  supporters: any[] = [];
  lastestComment: { content: string; postTime: string; }[] | undefined;

  new_status: String = '';
  cur_status?: String = this.request.status;
  isOpen: boolean = false;
  status: string[] = ['verified', 'accepted', 'rejected'];
  mapStatus!: Map<string, IBaseStatus>; 
  mapSupportStatus!: Map<string, IBaseStatus>;
  mapPriority: any
  news: INew[] = [];
  user: any;
  create_time:string='';
  trans: ITransaction[] = [];
  supportObject: ISupport[] = [];
  defaultComment: INew = {
    subject: 'new_comment',
    content: '',
    target_type: 'sos_request',
    target_id: this.request.id,
  };
  onClose() {
    this.bottomRef.dismiss(this.request);
  }
  mark($event: any, action?: string) {
    console.log(action);
    $event.stopPropagation();
    $event.preventDefault();
    this.UrgentRequestService.markRequest(this.request?.id,
      { bookmarker_type: 'user', action: action, bookmarker_id: this.user.id })
      .subscribe((res) => {
        if (action == 'bookmark') { console.log(true); this.request!.is_bookmarked = true; } else { console.log("else"); this.request!.is_bookmarked = false; }
      })
  }

  constructor(
    public bottomRef: MatBottomSheetRef<RequestCardDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public request: ISOSRequest,
    public dialog: MatDialog,
    private SupportTransService: SupportTransService,
    private NewsService: NewsService,
    private SupportObjectService: SupportObjectService,
    private UrgentRequestService: UrgentRequestService,
    private StorageService: StorageService,
    private ConstantsService: ConstantsService,
    private storageService: StorageService,
    private notification: NotificationService,
    private generalService: GeneralService
  ) {
    if (this.request.status === 'open') {
      this.isOpen = true;
    }
    this.supportObject = this.SupportObjectService.getSupportObjectByType(
      this.request.support_types!
    );
    this.initalize();
    this.fetchInit();
  }
  show(data: any) {
    let content = data.target.value;
    if(!this.storageService.userInfo){
      this.notification.error("Hãy đăng nhập hoặc đăng kí để được bình luận")
      return
    }
    if (content)
      this.NewsService.create(
        { ...this.defaultComment, content: content },
        {}
      ).subscribe((res) => (this.news = [res, ...this.news]));
    data.target.value = '';
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
    this.mapPriority = this.ConstantsService.MAP_PRIORITY
    this.mapStatus = this.ConstantsService.REQUEST_STATUS
  }
  openDialog(): void {
    if (!this.StorageService.token) {
      this.notification.error("Đăng nhập hoặc đăng kí để tham gia.")
      return
    }
    const dialogRef = this.dialog.open(JoinRequestComponent, {
      data: { request_id: this.request.id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result != null){
        this.request = result
      }
    });
  }

  getStatusView(map: Map<string, IBaseStatus>): string{
    return map.get(this.request?.status || '')?.status_view || ''
  }

  getStatusSteps(map: Map<string, IBaseStatus>): string[]{
    return map.get(this.request?.status || '')?.next_step || []
  }

  getStatusString(map: Map<string, IBaseStatus>): string {
    return map.get(this.request?.status || '')?.status || ''
  }
  updateRequestStatus(item: string){
    console.log(this.mapStatus.get(item))
    const status = this.mapStatus.get(item)?.status || ''
    this.UrgentRequestService.verifyRequest(
      this.request.id || '',
      {
        status,
        note: ''
      }
    ).subscribe(result => {
      this.request = result
    });
  }

  openProposeDialog(): void {
    const dialogRef = this.dialog.open(ProposeRequestComponent, {
      data: { request_id: this.request.id },
    });
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
    this.UrgentRequestService.verifyRequest(this.request.id, {
      status: 'verified',
      note: ''
    }).subscribe(res => this.request = res);
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

  ngOnInit(): void {
    this.length = this.request?.medias?.length!;
    this.pageEvent!.pageIndex = 0;
    this.user = this.StorageService.userInfo;
    this.create_time=this.generalService.diffDate(new Date(this.request?.created_time!))
  }
}
@Component({
  selector: 'join',
  templateUrl: './joinForm.html',
  providers: [MatFormFieldModule, FormsModule],
})
export class JoinRequestComponent {
  supportTypes: ISupportType[] = [];
  group_type: string = 'user';
  groups: any[] = [];

  joinRequest: IJoinRequest = {
    type: 'user',
    supporter_id: '',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JoinRequestComponent>,
    private SupportTypesService: SupportTypesService,
    private UrgentRequestService: UrgentRequestService,
    private storageService: StorageService
  ) {
    this.SupportTypesService.findAll().subscribe(
      (result) => (this.supportTypes = result)
    );
    this.groups = this.storageService.userInfo?.groups || []
    if(this.groups.length > 0){
      this.group_type = 'group'
    }
  }
  async onSubmit(data: any) {
    this.joinRequest.type = this.group_type;
    this.joinRequest.description = data.description;
    this.joinRequest.support_date = dayjs().format('YYYY-MM-DDTHH')
   this.joinRequest.supporter_id = this.group_type == 'user'?this.storageService.userInfo?.id:this.storageService.userInfo?.groups[0].id;
    this.UrgentRequestService.join(
      this.data.request_id,
      this.joinRequest
    ).subscribe(result => {
      this.dialogRef.close(result);
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
