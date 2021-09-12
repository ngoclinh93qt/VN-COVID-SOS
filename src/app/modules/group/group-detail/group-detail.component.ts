import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { UpdateNameComponent } from './update-name/update-name.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';
import { UpdateSupportComponent } from './update-support/update-support.component';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {
  onClose() {
    this.dialogRef.close();
  }

  openUpdateName(cur_name: any, id: any) {
    this.dialog.open(UpdateNameComponent, {
      panelClass: 'nameType',
      data: { cur_name: cur_name, id: id },
    });
  }

  openUpdatePhone(cur_phone: any, id: any) {
    this.dialog.open(UpdatePhoneComponent, {
      panelClass: 'phoneType',
      data: { cur_phone: cur_phone, id: id },
    });
  }

  openUpdateAddress(province: any, provinceId: any,wardName: any, wardCode: any,districtName: any, districtCode: any, address:any, id: any) {
    this.dialog.open(UpdateAddressComponent, {
      panelClass: 'addressType',
      data: { 
        province: province,
        provinceId: provinceId,
        wardName: wardName,
        wardCode: wardCode,
        districtName: districtName,
        districtCode: districtCode,
        address: address,
        id: id 
      },
    });
  }

  openUpdateSupport(cur_support: any, id: any) {
    this.dialog.open(UpdateSupportComponent, {
      panelClass: 'supportType',
      data: { cur_support: cur_support, id: id },
    });
  }

  openDeleteGroup(id: any){
    this.dialog.open(DeleteGroupComponent, {
      panelClass: 'deleteType',
      data: { id: id },
    });
  }
  constructor(
    public dialogRef: MatDialogRef<GroupDetailComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public group: IVolunteerGroup
  ) {}

  ngOnInit(): void {}
}
