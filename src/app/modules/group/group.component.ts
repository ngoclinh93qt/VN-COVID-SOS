import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateGroupComponent } from './create-group/create-group.component';
import { VolunteerGroupService } from 'src/app/core/http/volunteer-group.service';
import { SupportTypesService } from 'src/app/core/http/support-types.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  gridColumns = 2;
  groups: IVolunteerGroup[] = [];
  keysearch: string = '';
  searchData: IVolunteerGroup[] = [];
  supportTypes: ISupportType[] = [];
  filterSupport = new FormControl();
  constructor(
    private _bottomSheet: MatBottomSheet,
    public dialog: MatDialog,
    private groupService: VolunteerGroupService,
    private SupportTypesService: SupportTypesService
  ) {
    this.fetchInit();
  }

  fetchInit() {
    this.groupService.findAll().subscribe((result) => {
      this.groups = result;
      this.searchData = this.groups;
    });
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result;
    });
  }

  onSearchChange(searchValue: string): void {  
    this.keysearch = searchValue.toLocaleLowerCase();
    this.searchData = this.groups.filter((item: any) => item.name.toLocaleLowerCase().indexOf(this.keysearch) !== -1);
  }

  filter(data: any){
    if(data.value.length === 0){
      this.searchData = this.groups;
      return;
    }
    let dataFetch = this.groups.filter((i:any) => {
      const { support_types } = i.detail_info || [];
      return support_types.findIndex((t:any) => data.value.includes(t.type)) >= 0
    });
    this.searchData = dataFetch;
  }

  openDialog() {
    this.dialog.open(CreateGroupComponent,{
      panelClass: 'diaglog-createGroup',
      disableClose: true,
    }).afterClosed().subscribe((result: any) => {
      if(result){
        this.fetchInit();
      }
    })
  }

  openDialogGroup(group: IVolunteerGroup): void {
    const dialogRef = this.dialog.open(GroupDetailComponent, {
      panelClass: 'dialog-volunteer',
      disableClose: true,
      data: group
    }).afterClosed().subscribe((result: any) => {
      if(result){
        if(result.mess == 'delete'){
          this.searchData = this.groups.filter(el => el.id !== result.data.data.id);
          return;
        }
        this.searchData = this.groups.map(element => result.data.id === element.id ? result.data: element);
      }
    })
  }

  ngOnInit(): void {}
}
