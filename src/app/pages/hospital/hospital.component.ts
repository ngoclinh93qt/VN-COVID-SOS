import { Component, OnInit } from '@angular/core';
import { Hospital } from './model/hospital.mode';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  gridColumns = 3;
  hospitals: Hospital[] = [];

  constructor() {
    this.hospitals = [
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

  ngOnInit(): void {}
}
