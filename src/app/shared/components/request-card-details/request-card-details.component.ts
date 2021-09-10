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
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-request-card-details',
  templateUrl: './request-card-details.component.html',
  styleUrls: ['./request-card-details.component.scss'],
})
export class RequestCardDetailsComponent implements OnInit {
  mapPriority: any
  mapStatus: any
  news: INew[] = [];
  user: any;
  trans: ITransaction[] = [];
  supportObject: ISupport[] = [];
  defaultComment: INew = {
    subject: ' ',
    content: '',
    target_type: 'sos_request',
    target_id: this.request.id,
  };
  onClose() {
    this.dialogRef.close();
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
    public dialogRef: MatDialogRef<RequestCardDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public request: ISOSRequest,
    public dialog: MatDialog,
    private SupportTransService: SupportTransService,
    private NewsService: NewsService,
    private SupportObjectService: SupportObjectService,
    private UrgentRequestService: UrgentRequestService,
    private StorageService: StorageService,
    private ConstantsService: ConstantsService
  ) {
    this.supportObject = this.SupportObjectService.getSupportObjectByType(
      this.request.support_types!
    );
    this.initalize();
    this.fetchInit();
  }
  show(data: any) {
    let content = data.target.value;
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
    this.mapStatus = this.ConstantsService.mapStatus
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(JoinRequestComponent, {
      data: { request_id: this.request.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
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
  }
}
@Component({
  selector: 'join',
  templateUrl: './joinForm.html',
  providers: [MatFormFieldModule, FormsModule],
})
export class JoinRequestComponent {
  supportTypes: ISupportType[] = [];
  joinRequest: IJoinRequest = {
    type: 'user',
    supporter_id: 'customerc74de9034800804c5be2197f986ec520',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<JoinRequestComponent>,
    private SupportTypesService: SupportTypesService,
    private UrgentRequestService: UrgentRequestService
  ) {
    this.SupportTypesService.findAll().subscribe(
      (result) => (this.supportTypes = result)
    );
  }
  async onSubmit(data: any) {
    console.log(data);
    this.joinRequest.description = data.description;
    this.joinRequest.support_date = data.support_date;
    console.log(this.joinRequest);
    this.UrgentRequestService.join(
      this.data.request_id,
      this.joinRequest
    ).subscribe();
    this.dialogRef.close();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
