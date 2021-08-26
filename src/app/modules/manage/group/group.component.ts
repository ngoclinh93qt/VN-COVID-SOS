import { GroupDetailComponent } from './group-detail/group-detail.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  groups: IVolunteerGroup[] = [];
  constructor(
    private VolunteerGroupService: VolunteerGroupService,
    public dialog: MatDialog
  ) {
    this.fetchInit();
  }
  openDialog(group: IVolunteerGroup): void {
    const dialogRef = this.dialog.open(GroupDetailComponent, {
      data: group,
    });
  }
  fetchInit() {
    this.VolunteerGroupService.findAll().subscribe((result) => {
      this.groups = result;
      console.log(result);
    });
  }
  ngOnInit(): void {}
}
