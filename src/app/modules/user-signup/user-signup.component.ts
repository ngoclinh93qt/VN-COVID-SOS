import { RequesterObjectStatusService } from './../../core/http/requester-object-status.service';
import { UsersService } from './../../core/http/users.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

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
  constructor(
    private formBuilder: FormBuilder,
    private UsersService: UsersService,
    private router: Router,
    public dialogRef: MatDialogRef<UserSignupComponent>
  ) { }

  createForm() {
    this.firstFormGroup = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
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
          return 'Y??u c????u nh????p s???? ??i????n thoa??i';
        }
        if (this.firstFormGroup.get('phone_number')?.hasError('minlength')) {
          return 'S???? ??i????n thoa??i t????i thi????u 10 ch???? s????';
        }
        if (this.isPhoneInUsed) return "S???? ??i????n thoa??i ??a?? ????????c s???? du??ng";
        return "";
        break;
      case 'password':
        if (this.firstFormGroup.get('password')?.hasError('required')) {
          return 'Y??u c????u nh????p m????t kh????u';
        }
        if (this.firstFormGroup.get('password')?.hasError('minlength')) {
          return 'M????t kh????u pha??i ch????a t????i thi????u 8 ki?? t????';
        }
        return '';
        break;
      case 'confirm_password':
        if (this.firstFormGroup.get('confirm_password')?.hasError('required')) {
          return 'Y??u c????u nh????p la??i m????t kh????u xa??c th????c';
        }
        if (this.firstFormGroup.get('confirm_password')?.hasError('minlength')) {
          return 'M????t kh????u xa??c th????c pha??i ch????a t????i thi????u 8 ki?? t????';
        }
        if (this.firstFormGroup.get('confirm_password')?.value != this.firstFormGroup.get('password')?.value) {
          return 'M????t kh????u xa??c th????c kh??ng tru??ng kh????p';
        }
        return '';
        break;
      case 'confirm_code':
        if (this.secondFormGroup.get('confirm_code')?.hasError('required')) {
          return 'Y??u c????u nh????p ma?? xa??c nh????n';
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
        console.log(result);
        this.user.phone_number = result.phone_number;
        this.stepper.next();

      },
      error => { this.isPhoneInUsed = true; }
    );
  }
  onResend() {
    this.UsersService.resendCode(this.user!, {}).subscribe(
      (result) => {
        console.log(result);

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
        console.log(this.user);
        this.isValidOTP = true;
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
        console.log(this.user);
      },
      error => { console.log(error); }
    );
    console.log(this.user);
    this.router.navigateByUrl('/home');
  }
  ngOnInit(): void {

    this.createForm();
  }
}
function MustMatch(arg0: string, arg1: string): any {
  throw new Error('Function not implemented.');
}

