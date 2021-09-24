import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConstantsService {
  mapPriority = new Map();
  public STORAGE_KEY = {
    AMIN_INFO: 'admin_info',
    USER_INFO: 'user_info',
    AUTH_TOKEN: 'token',
    LOCATION: 'location'
  };
  public SESSION = {
    CREATED_REQUESTS: 'created_requests',
    MAP_REQUESTS: 'map_requests',
    ALL_REQUESTS: 'app_requests',
    SUGGESTED_REQUESTS: 'suggested_requests',
    JOINED_REQUESTS: 'joined_requests',
    BOOKMARKED_REQUESTS: 'bookmarked_request',
    DEFAULT: 'default',
  };
  public MAP_SESSION_STATUS = new Map<string, Map<string, IBaseStatus>>();
  public DEFAULT_LOCATION = {
    HoChiMinh: { lat: 10.762622, lng: 106.660172 },
    DaNang: { lat: 16.047079, lng: 108.206230 },
    CanTho: { lat: 10.045162, lng: 105.746857 }
  };
  public DEFAULT_REQUEST_COLOR = 'oranged';
  public MAP_PRIORITY = this.mapPriority;
  public REQUEST_STATUS = new Map<string, IBaseStatus>();
  public OWNER_REQUEST_STATUS = new Map<string, IBaseStatus>();
  public SUPPORT_STATUS = new Map<string, IBaseStatus>();
  public STATUS_LIST: IRequestStatus[] = [
    {
      name: 'Đã mở',
      type: 'open',
    },
    {
      name: 'Đã xác thực',
      type: 'verified',
    },
    {
      name: 'Đã mở lại',
      type: 're-open',
    },
    {
      name: 'Đang chờ',
      type: 'pending',
    },
  ];
  constructor() {
    this.MAP_SESSION_STATUS.set(this.SESSION.ALL_REQUESTS, this.REQUEST_STATUS);
    this.MAP_SESSION_STATUS.set(
      this.SESSION.BOOKMARKED_REQUESTS,
      this.REQUEST_STATUS
    );
    this.MAP_SESSION_STATUS.set(
      this.SESSION.CREATED_REQUESTS,
      this.OWNER_REQUEST_STATUS
    );
    this.MAP_SESSION_STATUS.set(
      this.SESSION.JOINED_REQUESTS,
      this.REQUEST_STATUS
    );
    this.MAP_SESSION_STATUS.set(
      this.SESSION.SUGGESTED_REQUESTS,
      this.REQUEST_STATUS
    );
    this.MAP_SESSION_STATUS.set(this.SESSION.MAP_REQUESTS, this.REQUEST_STATUS);
    this.MAP_SESSION_STATUS.set(this.SESSION.DEFAULT, this.REQUEST_STATUS);
    this.mapPriority.set('red', 'red');
    this.mapPriority.set('orange', 'orange');
    this.mapPriority.set('yellow', '#FF6936');
    this.OWNER_REQUEST_STATUS.set('open', {
      action: 'open',
      action_view: 'Mở',
      status: 'open',
      status_view: 'Đã mở',
      next_step: ['resolved'],
    });
    this.OWNER_REQUEST_STATUS.set('resolved', {
      action: 'resolved',
      action_view: 'Hoàn thành',
      status: 'resolved',
      status_view: 'Đã giải quyết',
      next_step: [],
    });
    this.REQUEST_STATUS.set('open', {
      action: 'open',
      action_view: 'Mở',
      status: 'open',
      status_view: 'Đã mở',
      next_step: ['verified', 'accepted', 'rejected', 'resolved'],
    });
    this.REQUEST_STATUS.set('verified', {
      action: 'verified',
      action_view: 'Xác thực',
      status: 'verified',
      status_view: 'Đã xác thực',
      next_step: ['accepted'],
      color: '#05944F',
      bg_color: '#1AAE5F1A',
      icon: 'done',
    });
    this.REQUEST_STATUS.set('accepted', {
      action: 'accepted',
      action_view: 'Nhận',
      status: 'accepted',
      status_view: 'Đã có người nhận',
      next_step: ['executing'],
    });
    this.REQUEST_STATUS.set('executing', {
      action: 'executing',
      action_view: 'Thực hiện',
      status: 'executing',
      status_view: 'Đang Thực hiện',
      next_step: ['resolved'],
    });
    this.REQUEST_STATUS.set('resolved', {
      action: 'resolved',
      action_view: 'Hoàn thành',
      status: 'resolved',
      status_view: 'Đã giải quyết',
      next_step: [],
    });
    this.REQUEST_STATUS.set('re-open', {
      action: 're-open',
      action_view: 'Mở lại',
      status: 're-open',
      status_view: 'Đã mở lại',
      next_step: ['verified', 'accepted', 'rejected'],
    });
    this.REQUEST_STATUS.set('rejected', {
      action: 'rejected',
      action_view: 'Loại bỏ',
      status: 'rejected',
      status_view: 'Đã loại bỏ',
      next_step: ['re-open'],
    });

    this.SUPPORT_STATUS.set('open', {
      action: 'open',
      action_view: 'Mở',
      status: 'open',
      status_view: 'Đã Tham gia',
      next_step: ['executing', 'canceled', 'pending'],
    });
    this.SUPPORT_STATUS.set('canceled', {
      action: 'canceled',
      action_view: 'Đóng',
      status: 'canceled',
      status_view: 'Đã Đóng',
      next_step: ['executing'],
    });

    this.SUPPORT_STATUS.set('executing', {
      action: 'executing',
      action_view: 'Thực hiện',
      status: 'executing',
      status_view: 'Đang Thực hiện',
      next_step: ['resolved', 'canceled', 'pending'],
    });

    this.SUPPORT_STATUS.set('resolved', {
      action: 'resolved',
      action_view: 'Hoàn thành',
      status: 'resolved',
      status_view: 'Đã hoàn thành',
      next_step: [],
    });

    this.SUPPORT_STATUS.set('pending', {
      action: 'pending',
      action_view: 'Chờ',
      status: 'pending',
      status_view: 'Đang chờ',
      next_step: ['canceled', 'executing'],
    });
  }
}
