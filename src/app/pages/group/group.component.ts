import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupService } from 'src/app/shared/services/rest-services/group.service';

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
    private groupService: GroupService
  ) {
    this.groups = groupService.groups;
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
