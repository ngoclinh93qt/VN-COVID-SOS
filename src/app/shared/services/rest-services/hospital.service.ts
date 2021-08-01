import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from 'src/app/pages/hospital/model/hospital.mode';
import { BaseHttpService } from '../base-http.service';
import { NotificationService } from '../notification.service';
// import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})

//extends RestService
export class HospitalService  {
  hospitals = [
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

  // error HttpClient
  // constructor(http: HttpClient, notif: NotificationService) {
  //   super(http, notif, '')
  // }

  constructor() {

  }




  fetechHospitalList(): Hospital[] {
    return this.hospitals;
  }

}
