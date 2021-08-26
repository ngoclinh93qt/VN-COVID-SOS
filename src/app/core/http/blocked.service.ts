import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blocked } from 'src/app/modules/blocked/model/blocked.model';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class BlockedService extends RestService<IBlocked> {
  public model: any = Blocked;
  constructor(http: HttpClient) {
    super(http, '');
  }
  getGeneralData() {
    var res: IBlockedGeneral = {
      numBlocked: this.getNumberOfBlockeds(),
      numNeedSupport: this.getNumberOfNeedSupportBlockeds(),
      numStable: this.getNumberOfStableBlockeds(),
    };
    return res;
  }
  getNumberOfBlockeds() {
    return this.blockeds.length;
  }
  getNumberOfNeedSupportBlockeds() {
    var res = 0;
    this.blockeds.forEach((blocked) => {
      res += blocked.needSupport ? 1 : 0;
    });
    return res;
  }
  getNumberOfStableBlockeds() {
    var res = 0;
    this.blockeds.forEach((blocked) => {
      res += blocked.needSupport ? 0 : 1;
    });
    return res;
  }
  public blockeds: IBlocked[] = [
    {
      id: '1',
      needSupport: true,
      name: 'Khu phong tỏa P11, Quận Thủ Đức',
      address: '311 Linh Đông, P11, Quận Thủ Đức',
      numHouseholds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      id: '2',
      needSupport: true,
      name: 'Khu phong tỏa P1, Quận Thủ Đức',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numHouseholds: 500,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      needSupport: true,
      id: '3',
      name: 'Khu phong tỏa P12, Quận Bình Thạnh',
      address: '207 Nơ Trang Long, P12, Quận B Thạnh',
      numHouseholds: 700,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      needSupport: true,
      id: '4',
      name: 'Khu phong tỏa P3, Quận Thủ Đức',
      address: '311 Linh Đông, P31, Quận Thủ Đức',
      numHouseholds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      needSupport: true,
      id: '5',
      name: 'Khu phong tỏa P1, Quận Thủ Đức',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numHouseholds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      needSupport: true,
      id: '6',
      name: 'Khu phong tỏa P3, Quận B Thạnh',
      address: '207 Nơ Trang Long, P3, Quận B Thạnh',
      numHouseholds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      needSupport: false,
      id: '7',
      name: 'Khu phong tỏa P7, Quận Thủ Đức',
      address: '222 Linh Trung, P7, Quận Thủ Đức',
      numHouseholds: 300,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      needSupport: false,
      id: '8',
      name: 'Khu phong tỏa P4, Quận Thủ Đức',
      address: '312 Linh Tây, P4, Quận Thủ Đức',
      numHouseholds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
  ];
}
