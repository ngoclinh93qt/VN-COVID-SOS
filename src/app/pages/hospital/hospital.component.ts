import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/core/services/rest-services/hospital.service';
import { Hospital } from './model/hospital.mode';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.scss'],
})
export class HospitalComponent implements OnInit {
  gridColumns = 3;
  hospitals = [];

  constructor(private hospitalService: HospitalService,) {
    hospitalService.findAll()
  }

  ngOnInit(): void {}
}
