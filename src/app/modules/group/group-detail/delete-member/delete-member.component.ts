import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-delete-member',
  templateUrl: './delete-member.component.html',
  styleUrls: ['./delete-member.component.scss']
})
export class DeleteMemberComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private _dialogRef: MatDialogRef<DeleteMemberComponent>,
    private GroupService: VolunteerGroupService,
    private router: Router,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  async deleteMember(){
    let data = {
      "members": [
        {
          "id": this.group.memberId,
        },
      ],
    };
    this.GroupService.removeMemberGroup(this.group.id, data).subscribe((data: any) => {
      if(data){
        this.notification.success("Xoá thành công");
        this._dialogRef.close({data: data});
        return;
      }
      this.notification.error("Xoá thất bại");
    })
  }

}
