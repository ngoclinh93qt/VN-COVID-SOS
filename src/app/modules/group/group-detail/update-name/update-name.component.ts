import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';

@Component({
  selector: 'app-update-name',
  templateUrl: './update-name.component.html',
  styleUrls: ['./update-name.component.scss'],
})
export class UpdateNameComponent implements OnInit,AfterViewInit {
  dataFetch: string = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private _dialogRef: MatDialogRef<UpdateNameComponent>,
    private GroupService: VolunteerGroupService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataFetch = this.group.cur_name;
    }, 0);
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

  ngOnInit(): void {
    this.dataFetch = this.group;
  }
}
