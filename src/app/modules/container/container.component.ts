import { FormGroup, FormBuilder } from '@angular/forms';
import { ProvinceService } from 'src/app/core/http/province.service';
import { UserSignupComponent } from './../user-signup/user-signup.component';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginFrameComponent } from 'src/app/shared/components/login-frame/login-frame.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/core/services/storage.service';
import { AuthenService } from 'src/app/core/http/authen.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocationService } from 'src/app/shared/subjects/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, OnDestroy {
  showFiller = false;
  sideItems: SideItem[] | undefined;
  loginSuccess: boolean = false;
  isAvatar: boolean = false;
  userInfor: any;
  provinces: IProvince[] = [];
  provinceForm!: FormGroup;
  isInitialized: boolean = false;
  currentLocation: any;
  private destroy$ = new Subject();
  private DEFAULT_PROVINCE_CODE: number = 79;

  constructor(
    public dialog: MatDialog,
    private storage: StorageService,
    private authService: AuthenService,
    private provinceService: ProvinceService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkLogin();
    if (window.innerWidth <= 768) {
      this.showFiller = false;
    }
    this.router.onSameUrlNavigation = "reload";
    this.showFiller  = !this.detectMob();
    console.log("xxx", this.detectMob())
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
      // {
      //   name: 'Tổng quan',
      //   icon: 'home',
      //   url: 'home',
      // },
      {
        name: 'Yêu cầu khẩn cấp',
        icon: 'support',
        url: '',
        roles: ['OPERATOR', 'ADMIN', 'USER', 'GUEST']
      },
      {
        name: 'Trạm y tế',
        icon: 'local_hospital',
        url: 'clinic',
        roles: ['OPERATOR', 'ADMIN', 'USER', 'GUEST']
      },
      {
        name: 'Nhóm thiện nguyện',
        icon: 'group',
        url: 'group',
        roles: ['OPERATOR', 'ADMIN', 'USER']
      },
      // {
      //   name: 'Quản lí',
      //   icon: 'inventory',
      //   url: 'manage',
      // },
    ];
    this.provinceForm = this.formBuilder.group({
      province: [],
      current: {}
    });
    this.provinceForm.get('province')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe((province) => {
      if (this.isInitialized == false) {
        this.isInitialized = true;
        if (!!this.storage.last_location) {
          this.currentLocation = this.storage.last_location;
          const currentProvince: IProvince = {
            id: 'currentLocation', name: 'Vị trí hiện tại', default_location: `${this.currentLocation.lat},${this.currentLocation.lng}`
          }
          this.provinces = [currentProvince, ...this.provinces];
          this.provinceForm.get('province')?.setValue(currentProvince, { emitEvent: false });

          return;
        }
      }
      const coordinates = province.default_location.split(',');
      const location = { lat: parseFloat(coordinates![0]), lng: parseFloat(coordinates![1]) };
      console.log("city")
      this.storage.location = location;
      console.log(province)

    });
    this.provinceService.getProvinces().pipe(
      takeUntil(this.destroy$)
    ).subscribe(provinces => {
      this.provinces = provinces;
      const defaultProvince = provinces.find(prov => prov.code === this.DEFAULT_PROVINCE_CODE);
      this.provinceForm.get('province')?.setValue(defaultProvince);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  gotoProfile() {
    this.router.navigate(['/profile']);
  }

  loginPopup(): void {
    const dialogRef = this.dialog.open(
      LoginFrameComponent,
      { panelClass: 'login-frame-dialog', width: '100%', maxWidth: '585px ' }
    );
    dialogRef.afterClosed().subscribe((result: any) => {
      this.checkLogin();
    });
  }

  checkLogin() {
    if (this.storage.token) {
      this.loginSuccess = true;
      this.userInfor = this.storage.userInfo;
      let avatar = this.userInfor.avatar;
      if (avatar) {
        this.isAvatar = true;
      }
    }
  }

  closeMenu() {
    if (window.innerWidth <= 768) {
      this.showFiller = false;
    }
  }

  logout() {


    this.loginSuccess = false;
    this.router.navigateByUrl('/');
    window.location.reload();
    this.authService.logout();
  }

  getShortName(fullName: string) {
    return fullName.split(' ').map(n => n[0]).join('');
  }

  detectMob() {
    return window.matchMedia('(max-width: 700px)').matches
  }
}
type SideItem = {
  name: string;
  icon: string;
  url: string;
  roles: string[];
};

function openSignupDialog() {
  throw new Error('Function not implemented.');
}
