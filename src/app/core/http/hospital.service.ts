import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Blocked } from 'src/app/modules/blocked/model/blocked.model';
import { Hospital } from 'src/app/modules/hospital/model/hospital.mode';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class HospitalService extends RestService<IHospital> {
  public model: any = Hospital;
  constructor(http: HttpClient) {
    super(http, '');
  }
  getGeneralData() {
    var res: IHospitalGeneral = {
      numHospital: this.getNumberOfHospitals(),
      numNeedSupport: this.getNumberOfNeedSupportHospitals(),
      numStable: this.getNumberOfStableHospitals(),
    };
    return res;
  }
  getNumberOfHospitals() {
    return this.hospitals.length;
  }
  getNumberOfNeedSupportHospitals() {
    var res = 0;
    this.hospitals.forEach((hospital) => {
      res += hospital.needSupport ? 1 : 0;
    });
    return res;
  }
  getNumberOfStableHospitals() {
    var res = 0;
    this.hospitals.forEach((hospital) => {
      res += hospital.needSupport ? 0 : 1;
    });
    return res;
  }

  hospitals: IHospital[] = [
    {
      id: '1',
      needSupport: false,
      name: 'Bệnh viện A',
      address: '311 Linh Đông, P11, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      id: '2',
      needSupport: true,
      name: 'Bệnh viện B',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      id: '3',
      needSupport: true,
      name: 'Bệnh viện C',
      address: '207 Nơ Trang Long, P12, Quận B Thạnh',
      numPatient: 200,
      numBeds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      id: '4',
      needSupport: true,
      name: 'Bệnh viện A',
      address: '311 Linh Đông, P11, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      id: '5',
      needSupport: false,
      name: 'Bệnh viện B',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      id: '6',
      needSupport: true,
      name: 'Bệnh viện C',
      address: '207 Nơ Trang Long, P12, Quận B Thạnh',
      numPatient: 200,
      numBeds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      id: '7',
      needSupport: true,
      name: 'Bệnh viện B',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
    {
      id: '8',
      needSupport: false,
      name: 'Bệnh viện B',
      address: '222 Linh Tây, P1, Quận Thủ Đức',
      numPatient: 200,
      numBeds: 200,
      statusList: [
        { key: 'Khẩu trang', value: 200 },
        { key: 'Đồ bảo hộ', value: 200 },
        { key: 'Máy thở oxy', value: 200 },
      ],
    },
  ];
}
