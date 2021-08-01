import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blocked } from 'src/app/pages/blocked/model/blocked.model';
import { Hospital } from 'src/app/pages/hospital/model/hospital.mode';
import { NotificationService } from '../notification.service';
 import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService extends RestService<IHospital> {
  public model: any = Hospital;
  constructor(http: HttpClient) { 
    super(http, '')
  }


  hospitals: IHospital[] = [
    {
      id: "1",
      name: 'Bệnh viện A',
      address: '311 Linh Đông, P11, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "2",
      name: 'Bệnh viện B',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "3",
      name: 'Bệnh viện C',
      address: '207 Nơ Trang Long, P12, Quận B Thạnh',
      numPatient: 200,
      numBeds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "4",
      name: 'Bệnh viện A',
      address: '311 Linh Đông, P11, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "5",
      name: 'Bệnh viện B',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "6",
      name: 'Bệnh viện C',
      address: '207 Nơ Trang Long, P12, Quận B Thạnh',
      numPatient: 200,
      numBeds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "7",
      name: 'Bệnh viện B',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
    {
      id: "8",
      name: 'Bệnh viện B',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [{ key: 'Khẩu trang', value: 200 }, { key: 'Đồ bảo hộ', value: 200 }, { key: 'Máy thở oxy', value: 200 }],
    },
  ];
}