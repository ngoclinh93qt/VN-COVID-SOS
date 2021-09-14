import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { ProvinceService } from 'src/app/core/http/province.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.scss'],
})
export class UpdateAddressComponent implements OnInit {
  provinces: IProvince[] = [];
  province: IProvince = {id: '',};
  district: IDistrict = { code: 0 };
  provinceClick: boolean = false;
  districtClick: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private _dialogRef: MatDialogRef<UpdateAddressComponent>,
    private GroupService: VolunteerGroupService,
    public ProvinceService: ProvinceService,
    private notification: NotificationService
  ) {
    this.fetchInit();
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  async onSubmit(data: string) {
    this.GroupService.update(this.group.id, data, {}).subscribe((data: any) => {
      if(data){
        this.notification.success("Sửa thông tin thành công");
        this._dialogRef.close({data: data});
        return;
      }
      this.notification.error("Sửa thông tin thất bại");
    });
  }

  fetchInit() {
    this.ProvinceService.findAll().subscribe((result) => {
      this.provinces = result;
    });
  }

  getProvince(id: string) {
    this.provinceClick = true;
    this.ProvinceService.findOne(id).subscribe((result) => {
      this.province = result;
    });
  }
  getDistrict(id?: number) {
    this.districtClick = true;
    this.ProvinceService.getDistrict(this.province.id, id).subscribe(
      (result) => {
        this.district = result;
      }
    );
  }

  ngOnInit(): void {}
}
