import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/core/http/users.service';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-search-member',
  templateUrl: './search-member.component.html',
  styleUrls: ['./search-member.component.scss']
})
export class SearchMemberComponent implements OnInit {
  keysearch: string = '';
  searchData: any = {};
  isData: boolean | unknown;
  isSame: boolean  = false;
  dataFetch: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private _dialogRef: MatDialogRef<SearchMemberComponent>,
    private GroupService: VolunteerGroupService,
    private userService: UsersService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit(data:any) {
    let dataFetch = {
      "members": [
          {
              "id": data.id,
              "role": "user"
          }
      ]
   };   
    this.GroupService.addMemberGroup(this.group.id, dataFetch).subscribe((data: any)=>{
      if(data){
        this.notification.success("Thêm thành viên thành công");
        this.isSame = data.members.some((el:any)=> el.phone_number === this.keysearch);
        this.dataFetch = data;
        return;
      }
      this.notification.error("Thêm thành viên thất bại");
    });
  }

  CloseDialog() {
    if(this.dataFetch){
      this._dialogRef.close({data: this.dataFetch});
      return;
    }
    this._dialogRef.close();
  }

  onSearchChange(searchValue: string):void {
    this.keysearch = searchValue.toLocaleLowerCase();
    let data = {
      phone_number: this.keysearch
    };
    this.userService.searchProfile(data).subscribe((data: any) => {
      if(data){
        this.isData = true;
        this.searchData = data;
        this.isSame = this.group.members.some((el:any)=> el.phone_number === this.searchData.phone_number);
      }
    });
    if(this.searchData.phone_number !== this.keysearch){
      this.isData = false;
    }
  }
}
