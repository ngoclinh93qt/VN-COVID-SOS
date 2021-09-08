import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from './create-group/create-group.component';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  gridColumns = 2;
  groups: IVolunteerGroup[] = [];

  constructor(
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private groupService: VolunteerGroupService
  ) {
    this.fetchInit();
  }

  fetchInit() {
    this.groupService.findAll().subscribe((result) => {
      for(let item of result){
        if(item.avatar == '' || item.avatar == 'undefined'){
          item.avatar = 'assets/volunteer.png'
        }
      }
      this.groups = result;
      console.log(this.groups);
    });
  }

  openDialog() {
    this.dialog.open(CreateGroupComponent);
  }

  openBottomSheet(group: IVolunteerGroup): void {
    this._bottomSheet.open(GroupDetailComponent, {
      data: group,
    });
  }

  ngOnInit(): void {}
}
