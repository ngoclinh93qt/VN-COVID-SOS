import { Component, OnInit } from '@angular/core';
import { Blocked } from './model/blocked.model';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {
  gridColumns = 3;
  blockeds: Blocked[] = [];

  // constructor(private hospitalService: HospitalService,) {
  //   this.hospitals = hospitalService.fetechHospitalList()
  // }

  ngOnInit(): void {
  }

}
