import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNameComponent } from './update-name/update-name.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userInfo: any;
  constructor(private storage: StorageService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userInfo = this.storage.userInfo;
  }

  openEditName() {
    this.dialog
      .open(UpdateNameComponent, {
        data: {
          first_name: this.userInfo.first_name,
          last_name: this.userInfo.last_name,
        },
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result) {
          this.userInfo.first_name = result.data.first_name;
          this.userInfo.last_name = result.data.last_name;
        }
      });
  }
}
