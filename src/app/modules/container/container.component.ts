import { UserLoginComponent } from './../user-login/user-login.component';
import { UserSignupComponent } from './../user-signup/user-signup.component';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LoginFrameComponent } from 'src/app/shared/components/login-frame/login-frame.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/services/storage.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  showFiller = true;
  sideItems: SideItem[] | undefined;
  constructor(
    private dialogService: DialogService,
    public dialog: MatDialog
  ) {
    if(window.innerWidth <= 768){
      this.showFiller = false;
    }
  }
  
  openSignupDialog(): void {
    const dialogRef = this.dialog.open(UserSignupComponent, {
      panelClass: 'dialog-responsive',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit(): void {
    this.sideItems = [
      {
        name: 'Tổng quan',
        icon: 'home',
        url: 'home',
      },
      {
        name: 'Yêu cầu khẩn cấp',
        icon: 'support',
        url: 'urgentRequest',
      },
      {
        name: 'Bệnh viện',
        icon: 'local_hospital',
        url: 'hospital',
      },
      {
        name: 'Nhóm thiện nguyện',
        icon: 'group',
        url: 'group',
      },
      {
        name: 'Quản lí',
        icon: 'inventory',
        url: 'manage',
      },
    ];
  }

  loginPopup(){
    this.dialogService.openDialog(LoginFrameComponent, {panelClass: 'login-frame-dialog', width: '100%', maxWidth: '585px'})
  }

  closeMenu(){
    if(window.innerWidth <= 768){
      this.showFiller = false;
    }
  }
}
type SideItem = {
  name: string;
  icon: string;
  url: string;
};

function openSignupDialog() {
  throw new Error('Function not implemented.');
}
