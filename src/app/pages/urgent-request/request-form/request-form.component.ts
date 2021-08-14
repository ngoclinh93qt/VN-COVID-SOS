import { RequesterObjectStatusService } from './../../../shared/services/rest-services/requester-object-status.service';
import { UrgentRequestService } from './../../../shared/services/rest-services/urgent-request.service';
import { MatDialogRef } from '@angular/material/dialog';
import { SupportTypesService } from './../../../shared/services/rest-services/support-types.service';
import { ProvinceService } from './../../../shared/services/rest-services/province.service';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { IProvince, IDistrict, ISupportType, ISOSRequest, IRequesterObjectStatus } from 'src/typings';


@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {

  location: string = "";
  provinces: IProvince[] = [];
  provinceID: string = '';
  province: IProvince = {
    id: ''
  };
  district: IDistrict = { code: 0 };
  supportTypes: ISupportType[] = [];
  requesterObjectStatus: IRequesterObjectStatus[] = [];
  request: ISOSRequest = {};
  constructor(private RequesterObjectStatusService: RequesterObjectStatusService, private ProvinceService: ProvinceService, private SupportTypesService: SupportTypesService, private UrgentRequestService: UrgentRequestService) {
    this.ProvinceService.findAll().subscribe(result => {
      this.provinces = result
    })
    this.SupportTypesService.findAll().subscribe(result => {
      this.supportTypes = result
    })
    this.RequesterObjectStatusService.findAll().subscribe(result => {
      this.requesterObjectStatus = result
    })
  }

  async onSubmit(data: ISOSRequest) {
  
    data.requester_type = "guest";
    data.medias = [];
    data.location = this.location;
    console.log(data);
    this.UrgentRequestService.create(data, {});
  }

  getProvince(id: string) {
    this.ProvinceService.findOne(id).subscribe(result => {
      this.province = result
    })
  }
  getDistrict(id?: number) {
    this.ProvinceService.getDistrict(this.province.id, id).subscribe(result => {
      this.district = result
    })
  }
  setLocation(l: string) {
    this.location = l;
  }
  ngOnInit() {
    var l: string = '';
    function getCurrentLocation(setLocation: Function) {
      navigator.geolocation.getCurrentPosition(function (position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        l = `${lat},${long}`;
        setLocation(l);
      });
    }
    getCurrentLocation(this.setLocation.bind(this))

  }

}
