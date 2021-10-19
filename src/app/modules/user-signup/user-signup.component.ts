import { RequesterObjectStatusService } from './../../core/http/requester-object-status.service';
import { UsersService } from './../../core/http/users.service';

import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.scss'],
})
export class UserSignupComponent implements OnInit {
  @ViewChild('stepper') stepper: any;
  isConfirmed: boolean = false;
  userID: String = '';
  user: IUser = { phone_number: '' };
  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  isPhoneInUsed: boolean = false;
  isValidOTP: boolean | undefined;
  isAcceptNDA = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public phone: number,
    private formBuilder: FormBuilder,
    private UsersService: UsersService,
    private router: Router,
    public dialogRef: MatDialogRef<UserSignupComponent>
  ) { }
  createForm() {
    this.firstFormGroup = this.formBuilder.group({
      phone_number: [this.phone ? this.phone : '', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]],
    }, {
      validators: this.password.bind(this)
    });
    this.secondFormGroup = this.formBuilder.group({
      confirm_code: ['', Validators.required]
    });
    this.thirdFormGroup = this.formBuilder.group({
      first_name: [''],
      address: [''],
      last_name: ['']
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  password(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
  getError(el: any) {
    switch (el) {
      case 'phone':
        if (this.firstFormGroup.get('phone_number')?.hasError('required')) {
          return 'Yêu cầu nhập số điện thoại';
        }
        if (this.firstFormGroup.get('phone_number')?.hasError('minlength')) {
          return 'Số điện thoại tối thiểu 10 chữ số';
        }
        if (this.isPhoneInUsed) return "Số điện thoại đã được sử dụng";
        return "";
        break;
      case 'password':
        if (this.firstFormGroup.get('password')?.hasError('required')) {
          return 'Yêu cầu nhập mật khẩu';
        }
        if (this.firstFormGroup.get('password')?.hasError('minlength')) {
          return 'Mật khẩu phải chứa tối thiểu 8 kí tự';
        }
        return '';
        break;
      case 'confirm_password':
        if (this.firstFormGroup.get('confirm_password')?.hasError('required')) {
          return 'Yêu cầu nhập lại mật khẩu xác thực';
        }
        if (this.firstFormGroup.get('confirm_password')?.hasError('minlength')) {
          return 'Mật khẩu xác thực phải chứa tối thiểu 8 kí tự';
        }
        if (this.firstFormGroup.get('confirm_password')?.value != this.firstFormGroup.get('password')?.value) {
          return 'Mật khẩu xác thực không trùng khớp';
        }
        return '';
        break;
      case 'confirm_code':
        if (this.secondFormGroup.get('confirm_code')?.hasError('required')) {
          return 'Yêu cầu nhập mã xác nhận';
        }
        return '';
        break;
      default:
        return '';
    }
  }

  AccountSetupSubmit(user: IUser) {


    this.UsersService.create({ phone_number: user.phone_number, password: user.password, debug: "true" }, {}).subscribe(
      (result) => {
        this.user.phone_number = result.phone_number;
        this.user.confirm_code = result.confirm_code;
        this.stepper.next();

      },
      error => { this.isPhoneInUsed = true; }
    );
  }
  onResend() {
    this.UsersService.resendCode(this.user!, {}).subscribe(
      (result) => {
      },
      error => { console.log(error); }
    );
  }
  onConfirm(event: any, user: IUser) {
    console.log(user);
    this.user!.confirm_code = user.confirm_code;
    this.UsersService.confirm(this.user!, {}).subscribe(
      (result) => {
        this.user = result;
        this.isValidOTP = true;
        this.UsersService.getProfile().subscribe();
        this.stepper.next()
      },
      error => { this.isValidOTP = false; }
    );
  }
  finished(userInfo: IUser) {
    userInfo.phone_number = this.user.phone_number;

    this.UsersService.updateProfile(userInfo, {}).subscribe(
      (result) => {
        this.user = result;
        this.router.navigateByUrl('/home');
      },
      error => { console.log(error); }
    );
  }
  ngOnInit(): void {

    this.createForm();
  }
  checkAccept(isAccept: boolean){
    this.isAcceptNDA= isAccept;
  }
}
function MustMatch(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}

