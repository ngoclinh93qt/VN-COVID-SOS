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
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { ConfirmCodeService } from 'src/app/core/http/confirm-code.service';

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
    private FormatService: FormatService,
    private notification: NotificationService,
    private confirmCodeService: ConfirmCodeService
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
    this.GroupService.create(data, {}).subscribe((data: any) =>{
      if(data){
        this.notification.success("Tạo nhóm thành công");
        this._dialogRef.close({data: data});
        return;
      }
      this.CloseDialog();
      this.notification.error("Xoá nhóm thất bại");
    });
  }

  ngOnInit(): void {}

  requestConfirm(phoneNumber: string){
    this.notification.info("Xin vui lòng chờ trong giây lát chúng tôi sẽ gửi mã xác nhận tới số điện thoại của bạn", 10000)
    this.confirmCodeService.requestCode(phoneNumber).subscribe()
  }
}
