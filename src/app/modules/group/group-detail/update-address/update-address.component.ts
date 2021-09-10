import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { ProvinceService } from 'src/app/core/http/province.service';
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
    public ProvinceService: ProvinceService
  ) {
    this.fetchInit();
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  checkSubmit(data: any) {
    if (data.status == 'VALID') this.CloseDialog();
  }

  async onSubmit(data: string) {
    console.log(data);
    this.GroupService.update(this.group.id, data, {}).subscribe();
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
