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
    LOCATION: 'location',

  };
  public DEFAULT_LOCATION = { lat: 10.762622, lng: 106.660172 }
  public DEFAULT_REQUEST_COLOR='oranged'
  public MAP_PRIORITY = this.mapPriority;
  public REQUEST_STATUS = new Map<string, IBaseStatus>();
  public SUPPORT_STATUS = new Map<string, IBaseStatus>();
  constructor() {
    this.mapPriority.set('red', 'red');
    this.mapPriority.set('orange', 'orange');
    this.mapPriority.set('yellow', '#FF6936');

    this.REQUEST_STATUS.set('open', {
      action: 'open',
      action_view: 'Mở',
      status: 'open',
      status_view: 'Đã mở',
      next_step: ['verified', 'accepted', 'rejected']
    })
    this.REQUEST_STATUS.set('verified', {
      action: 'verified',
      action_view: 'Xác thực',
      status: 'verified',
      status_view: 'Đã xác thực',
      next_step: ['accepted'],
      color: '#05944F',
      bg_color: '#1AAE5F1A',
      icon: 'done'
    })
    this.REQUEST_STATUS.set('accepted', {
      action: 'accepted',
      action_view: 'Nhận',
      status: 'accepted',
      status_view: 'Đã có người nhận',
      next_step: ['executing']
    })
    this.REQUEST_STATUS.set('executing', {
      action: 'executing',
      action_view: 'Thực hiện',
      status: 'executing',
      status_view: 'Đang Thực hiện',
      next_step: ['resolved']
    })
    this.REQUEST_STATUS.set('resolved', {
      action: 'resolved',
      action_view: 'Hoàn thành',
      status: 'resolved',
      status_view: 'Đã giải quyết',
      next_step: []
    })
    this.REQUEST_STATUS.set('re-open', {
      action: 're-open',
      action_view: 'Mở lại',
      status: 're-open',
      status_view: 'Đã mở lại',
      next_step: ['verified', 'accepted', 'rejected']
    })
    this.REQUEST_STATUS.set('rejected', {
      action: 'rejected',
      action_view: 'Loại bỏ',
      status: 'rejected',
      status_view: 'Đã loại bỏ',
      next_step: ['re-open']
    })



    this.SUPPORT_STATUS.set('open', {
      action: 'open',
      action_view: 'Mở',
      status: 'open',
      status_view: 'Đã Tham gia',
      next_step: ['executing', 'canceled', 'pending']
    })
    this.SUPPORT_STATUS.set('canceled', {
      action: 'canceled',
      action_view: 'Đóng',
      status: 'canceled',
      status_view: 'Đã Đóng',
      next_step: ['executing']
    })

    this.SUPPORT_STATUS.set('executing', {
      action: 'executing',
      action_view: 'Thực hiện',
      status: 'executing',
      status_view: 'Đang Thực hiện',
      next_step: ['resolved', 'canceled', 'pending']
    })

    this.SUPPORT_STATUS.set('resolved', {
      action: 'resolved',
      action_view: 'Thực hiện',
      status: 'resolved',
      status_view: 'Đã thực hiện',
      next_step: []
    })

    this.SUPPORT_STATUS.set('pending', {
      action: 'pending',
      action_view: 'Chờ',
      status: 'pending',
      status_view: 'Đang chờ',
      next_step: ['canceled', 'executing']
    })

  }


}
