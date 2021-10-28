import { GeneralService } from './../../../core/services/general.service';
import { ConstantsService } from 'src/app/shared/constant/constants.service';
import { StorageService } from './../../../core/services/storage.service';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss'],
})
export class RequestCardComponent implements OnInit {
  @Input() request?: ISOSRequest;
  @Input() type?: String;
  @Input() session?: String;
  @Input() isSuggested?: boolean = false;
  createTime: string = ''
  user: any;
  mapPriority: any;
  mapStatus: any;
  distance: string = ''
  isBookmarkSession: boolean = false;
  isRemote: boolean = false
  typesMap!: Map<string, any>;
  constructor(private GeneralService: GeneralService,
    private UrgentRequestService: UrgentRequestService,
    private StorageService: StorageService,
    public constant: ConstantsService,
    private notificationService: NotificationService) {
  }
  mark($event: any, action?: string) {
    $event.stopPropagation();
    $event.preventDefault();
    if (!this.user) {
      this.notificationService.warn("Bạn cần phải đăng nhập để sử dụng chức năng này")
      return
    }
    this.UrgentRequestService.markRequest(this.request?.id,
      { bookmarker_type: 'user', action: action, bookmarker_id: this.user.id })
      .subscribe((res) => {
        if (action == 'bookmark') { console.log(true); this.request!.is_bookmarked = true; }
        else {
          console.log("else"); this.request!.is_bookmarked = false;
          if (this.isBookmarkSession == true) this.isRemote = true;;
        }
      })

  }

  ngOnInit(): void {
    this.mapPriority = this.constant.MAP_PRIORITY;
    this.mapStatus = this.constant.REQUEST_STATUS;
    this.typesMap = this.constant.TYPE_REQUEST;
    this.user = this.StorageService.userInfo;
    this.isBookmarkSession = (this.session == this.constant.SESSION.BOOKMARKED_REQUESTS)
    this.createTime = this.GeneralService.diffDate(new Date(this.request?.created_time!))
    const RLocation = this.request?.location?.split(',')
    const CLocation = this.StorageService.location;
    this.distance = this.GeneralService.getDistanceFromLatLonInKm(parseFloat(RLocation![0]), parseFloat(RLocation![1]), CLocation.lat, CLocation.lng);
  }
}
