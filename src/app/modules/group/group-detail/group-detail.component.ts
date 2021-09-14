import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { SearchMemberComponent } from './search-member/search-member.component';
import { UpdateAddressComponent } from './update-address/update-address.component';
import { UpdateNameComponent } from './update-name/update-name.component';
import { UpdatePhoneComponent } from './update-phone/update-phone.component';
import { UpdateSupportComponent } from './update-support/update-support.component';
import { S3Service } from "../../../core/services/s3.service";
import { DeleteMemberComponent } from './delete-member/delete-member.component';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss'],
})
export class GroupDetailComponent implements OnInit {

  currentInput:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: IVolunteerGroup,
    public dialogRef: MatDialogRef<GroupDetailComponent>,
    public dialog: MatDialog,
    private GroupService: VolunteerGroupService,
    private notification: NotificationService,
    private s3Service: S3Service
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close({data: this.group});
  }

  openUpdateName(cur_name: any, id: any) {
    this.dialog.open(UpdateNameComponent, {
      panelClass: 'nameType',
      disableClose: true,
      data: { cur_name: cur_name, id: id },
    }).afterClosed().subscribe((result: any)=>{
      if(result){
        this.group = result.data;
      }
    });
  }

  openUpdatePhone(cur_phone: any, id: any) {
    this.dialog.open(UpdatePhoneComponent, {
      panelClass: 'phoneType',
      disableClose: true,
      data: { cur_phone: cur_phone, id: id },
    }).afterClosed().subscribe((result: any)=>{
      if(result){
        this.group = result.data;
      }
    });
  }

  openUpdateAddress(
    province: any,
    provinceId: any,
    wardName: any,
    wardCode: any,
    districtName: any,
    districtCode: any,
    address: any,
    id: any
  ) {
    this.dialog.open(UpdateAddressComponent, {
      panelClass: 'addressType',
      disableClose: true,
      data: {
        province: province,
        provinceId: provinceId,
        wardName: wardName,
        wardCode: wardCode,
        districtName: districtName,
        districtCode: districtCode,
        address: address,
        id: id,
      },
    }).afterClosed().subscribe((result: any)=>{
      if(result){
        this.group = result.data;
      }
    })
  }

  openUpdateSupport(cur_support: any, id: any) {
    this.dialog.open(UpdateSupportComponent, {
      panelClass: 'supportType',
      disableClose: true,
      data: { cur_support: cur_support, id: id },
    }).afterClosed().subscribe((result: any)=>{
      if(result){
        this.group = result.data;
      }
    });
  }

  openDeleteGroup(id: any) {
    this.dialog.open(DeleteGroupComponent, {
      panelClass: 'deleteType',
      disableClose: true,
      data: { id: id },
    }).afterClosed().subscribe((result:any) => {
      if(result){
        this.dialogRef.close({data: result.data, mess: 'delete'});
      }
    })
  }

  openAddMember(members: any, id: any) {
    this.dialog.open(SearchMemberComponent, {
      panelClass: 'addMember',
      disableClose: true,
      data: {
        members: members,
        id: id,
      },
    }).afterClosed().subscribe((result: any)=>{
      if(Object.entries(result.data).length !== 0){
        this.group = result.data;
      }
    })
  }

  removeMember(groupId: any, memberId: any) {
    this.dialog.open(DeleteMemberComponent, {
      panelClass: 'deleteMember',
      disableClose: true,
      data: {
        memberId: memberId,
        id: groupId,
      },
    }).afterClosed().subscribe((result: any)=>{
      if(result){
        this.group.members = result.data.data.members;
      }
    })
  }

  onFileSelected(event:any, id: any) {
    let file = event.target.files[0];
    this.s3Service.uploadImage(file).subscribe(res => {
      if(res){
        let data = {
          "avatar" : res
        }
        this.GroupService.update(id, data, {}).subscribe((data: any)=>{
          if(data){
            this.notification.success("Thay đổi hình đại diện thành công");
            this.group = data;
            return;
          }
          this.notification.error("Thay đổi hình đại diện thất bại");
        });
      }
    })
  }
}
