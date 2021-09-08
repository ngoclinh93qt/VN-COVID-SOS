import { UserSignupComponent } from './../user-signup/user-signup.component';
import { Component, OnInit } from '@angular/core';
import { LoginFrameComponent } from 'src/app/shared/components/login-frame/login-frame.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthenService } from 'src/app/core/http/authen.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  showFiller = true;
  sideItems: SideItem[] | undefined;
  loginSuccess: boolean = false;
  isAvatar: boolean = false;
  userInfor: any;
  constructor(
    public dialog: MatDialog,
    private storage: StorageService,
    private authService: AuthenService
  ) {
    this.checkLogin();
    if(window.innerWidth <= 768){
      this.showFiller = false;
    }
  }
  
  openSignupDialog(): void {
    const dialogRef = this.dialog.open(UserSignupComponent, {
      panelClass: 'dialog-responsive',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.checkLogin();
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

  loginPopup():void{
    const dialogRef = this.dialog.open(
      LoginFrameComponent,
      {panelClass: 'login-frame-dialog', width: '100%', maxWidth: '585px'}
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      this.checkLogin();
    });
  }

  checkLogin(){
    if(this.storage.token){
      this.loginSuccess = true;
      this.userInfor = this.storage.userInfo;
      let avatar = this.userInfor.avatar;
      if(avatar){
        this.isAvatar = true;
      }
    }
  }

  closeMenu(){
    if(window.innerWidth <= 768){
      this.showFiller = false;
    }
  }

  logout(){
    this.loginSuccess = false;
    this.authService.logout();
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
