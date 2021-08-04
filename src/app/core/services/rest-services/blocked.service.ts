import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blocked } from 'src/app/pages/blocked/model/blocked.model';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class BlockedService extends RestService<IBlocked> {
  public model: any = Blocked;
  constructor(http: HttpClient) { 
    super(http, '')
  }


  public blockeds: IBlocked [] = [
    {
      id: "1",
      name: 'Khu phong tỏa P11, Quận Thủ Đức',
      address: '311 Linh Đông, P11, Quận Thủ Đức',
      numHouseholds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "2",
      name: 'Khu phong tỏa P1, Quận Thủ Đức',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numHouseholds: 500,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "3",
      name: 'Khu phong tỏa P12, Quận Bình Thạnh',
      address: '207 Nơ Trang Long, P12, Quận B Thạnh',
      numHouseholds: 700,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "4",
      name: 'Khu phong tỏa P3, Quận Thủ Đức',
      address: '311 Linh Đông, P31, Quận Thủ Đức',
      numHouseholds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "5",
      name: 'Khu phong tỏa P1, Quận Thủ Đức',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numHouseholds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "6",
      name: 'Khu phong tỏa P3, Quận B Thạnh',
      address: '207 Nơ Trang Long, P3, Quận B Thạnh',
      numHouseholds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "7",
      name: 'Khu phong tỏa P7, Quận Thủ Đức',
      address: '222 Linh Trung, P7, Quận Thủ Đức',
      numHouseholds: 300,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "8",
      name: 'Khu phong tỏa P4, Quận Thủ Đức',
      address: '312 Linh Tây, P4, Quận Thủ Đức',
      numHouseholds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
  ];

}
