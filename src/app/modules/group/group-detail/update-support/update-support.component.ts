import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { SupportTypesService } from 'src/app/core/http/support-types.service';

@Component({
  selector: 'app-update-support',
  templateUrl: './update-support.component.html',
  styleUrls: ['./update-support.component.scss']
})
export class UpdateSupportComponent implements OnInit {
  supportTypes: ISupportType[] = [];
  fetchData: any = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public group: any,
    private _dialogRef: MatDialogRef<UpdateSupportComponent>,
    private GroupService: VolunteerGroupService,
    private SupportTypesService: SupportTypesService,
  ) {
    this.fetchInit();
  }

  ngOnInit(): void {
  }

  fetchInit() {
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result;
    });
  }

  CloseDialog() {
    this._dialogRef.close();
  }

  checkSubmit(data: any) {
    if (data.status == 'VALID') this.CloseDialog();
  }

  compareObjects(o1: any, o2: any) {
    if(o1.type == o2.type )
    return true;
    else return false
  }

  async onSubmit(data: any) {
    this.GroupService.update(this.group.id, data, {}).subscribe();
  }

}
