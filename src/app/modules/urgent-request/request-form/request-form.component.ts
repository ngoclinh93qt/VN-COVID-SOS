import { StorageService } from 'src/app/core/services/storage.service';
import { UrgentLevelService } from '../../../core/http/urgent-level.service';
import { NgForm } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { RequesterObjectStatusService } from '../../../core/http/requester-object-status.service';
import { UrgentRequestService } from '../../../core/http/urgent-request.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupportTypesService } from '../../../core/http/support-types.service';
import { ProvinceService } from '../../../core/http/province.service';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  location: string = '';
  provinces: IProvince[] = [];
  province: IProvince = {
    id: '',
  };
  district: IDistrict = { code: 0 };
  supportTypes: ISupportType[] = [];
  requesterObjectStatus: IRequesterObjectStatus[] = [];
  urgentLevels: IPriorityType[] = [];
  onClose(): void {
    this.dialogRef.close();
    console.log('closeForm');
  }
  constructor(
    private RequesterObjectStatusService: RequesterObjectStatusService,
    private StorageService: StorageService,
    private ProvinceService: ProvinceService,
    private SupportTypesService: SupportTypesService,
    private UrgentRequestService: UrgentRequestService,
    public dialogRef: MatDialogRef<RequestFormComponent>,
    private UrgentLevelService: UrgentLevelService,

  ) {
    this.urgentLevels = UrgentLevelService.getUrgentLevels();
    this.fetchInit();
  }

  fetchInit() {
    this.ProvinceService.findAll().subscribe((result) => {
      this.provinces = result;
    });
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result;
    });
    this.RequesterObjectStatusService.findAll().subscribe((result) => {
      this.requesterObjectStatus = result;
    });
  }
  async onSubmit(data: ISOSRequest) {
    data.requester_type = '';
    data.medias = [];
    const user = this.StorageService.userInfo;
    console.log(user);
    if (user.role === 'USER') {
      data.requester_type = 'user';
      data.requester_id = user.id;
    }
    data.location = this.location;
    if (!data.support_types) data.support_types = [];
    if (!data.requester_object_status) data.requester_object_status = [];
    console.log(data);
    this.UrgentRequestService.create(data, {}).subscribe();
  }
  checkSubmit(data: any) {
    if (data.status == 'VALID') this.onClose();
  }
  getProvince(id: string) {
    this.ProvinceService.findOne(id).subscribe((result) => {
      this.province = result;
    });
  }
  getDistrict(id?: number) {
    this.ProvinceService.getDistrict(this.province.id, id).subscribe(
      (result) => {
        this.district = result;
      }
    );
  }
  setLocation(l: string) {
    this.location = l;
  }

  ngOnInit() {
    var l: string = '';
    let data = this.StorageService.setLocation();
    this.setLocation(`${data.lat},${data.lng}`);
    console.log(data);
  }
}
