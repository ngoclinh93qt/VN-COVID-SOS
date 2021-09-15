import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { ProvinceService } from 'src/app/core/http/province.service';
import { SupportTypesService } from 'src/app/core/http/support-types.service';
import { FormatService } from 'src/app/core/services/format.service';
@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  location: string = '';
  provinces: IProvince[] = [];
  province: IProvince = {
    id: '',
  };
  district: IDistrict = { code: 0 };
  supportTypes: ISupportType[] = [];

  constructor(
    private _dialogRef: MatDialogRef<CreateGroupComponent>,
    private ProvinceService: ProvinceService,
    private SupportTypesService: SupportTypesService,
    private GroupService: VolunteerGroupService,
    private FormatService: FormatService
  ) {
    this.fetchInit();
  }

  fetchInit() {
    this.ProvinceService.findAll().subscribe((result) => {
      this.provinces = result;
    });
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result;
    });
  }

  getProvince(id: string) {
    this.ProvinceService.findOne(id).subscribe((result) => {
      this.province = result;
      this.FormatService.format(this.province.districts);
    });
  }
  getDistrict(id?: number) {
    this.ProvinceService.getDistrict(this.province.id, id).subscribe(
      (result) => {
        this.district = result;
        this.FormatService.format(this.district.wards);
      }
    );
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  async onSubmit(data: IVolunteerGroup) {
    data.type = 'nhom_thien_nguyen';
    console.log(data);
    this.GroupService.create(data, {}).subscribe();
  }

  checkSubmit(data: any) {
    if (data.status == 'VALID') this.CloseDialog();
  }

  ngOnInit(): void {}
}
