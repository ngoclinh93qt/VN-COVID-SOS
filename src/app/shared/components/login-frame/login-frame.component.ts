import { ResetPasswordFrameComponent } from './../reset-password-frame/reset-password-frame.component';
import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenService } from '../../../core/http/authen.service';
import { UsersService } from '../../../core/http/users.service';
import { DialogService } from '../../../core/services/dialog.service';
import { UserSignupComponent } from 'src/app/modules/user-signup/user-signup.component';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.scss'],
})
export class LoginFrameComponent implements OnInit {
  formGroup!: FormGroup;
  isError: boolean = false;
  hide = true;
  isShow: boolean = false;
  regex = '(84|0[3|5|7|8|9])+([0-9]{8})';
  user: any;
  @Input() isDialog: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public phone: number,
    private formBuilder: FormBuilder,
    private authenService: AuthenService,
    private router: Router,
    private userService: UsersService,
    public dialogRef: MatDialogRef<LoginFrameComponent>,
    private dialogService: DialogService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      numberphone: [this.phone ? this.phone : '', [Validators.required, Validators.pattern(this.regex)]],
      password: ['', Validators.required],
    });
  }

  onSubmit(values: { numberphone: string; password: string }) {
    this.authenService.signin(values.numberphone, values.password).subscribe(
      (res: any) => {
        this.userService.getProfile().subscribe((result) => {
          this.user = result;
          this.onClose();
        });
        console.log("login")
        this.router.navigateByUrl('/urgentRequest');
      },
      (error) => {
        this.isError = true;
      }
    );
  }

  getError(el: any) {
    switch (el) {
      case 'phone':
        if (this.formGroup.get('numberphone')?.hasError('required')) {
          return 'Chưa nhập số điện thoại';
        } else if (this.formGroup.get('numberphone')?.hasError('pattern')) {
          return 'Số điện thoại không đúng';
        }
        return '';
        break;
      case 'pass':
        if (this.formGroup.get('password')?.hasError('required')) {
          return 'Chưa nhập mật khẩu';
        }
        return '';
        break;
      default:
        return '';
    }
  }

  showPass(value: boolean) {
    this.isShow = value;
  }

  onClose() {
    this.dialogRef.close();
  }

  openResetPassDialog() {
    this.dialogRef.close();
    this.dialogService.openDialog(ResetPasswordFrameComponent, {
      panelClass: 'reset-password-frame-dialog',
      width: '100%',
      maxWidth: '585px',
    });
  }

  signup() {
    this.dialogRef.close();
    this.dialog.open(UserSignupComponent, {
      panelClass: 'dialog-responsive'
    });
  }
}
