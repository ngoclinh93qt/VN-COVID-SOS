import { StorageService } from 'src/app/core/services/storage.service';
import { Router } from '@angular/router';
import { UsersService } from './../../../core/http/users.service';
import { Input, OnDestroy, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Subscription, timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password-frame',
  templateUrl: './reset-password-frame.component.html',
  styleUrls: ['./reset-password-frame.component.scss'],
})
export class ResetPasswordFrameComponent implements OnInit, OnDestroy {
  private OTP_MAX_TICK: number = 120;
  private PASSWORD_MIN_LENGTH: number = 8;

  phoneFormGroup!: FormGroup;
  otpFormGroup!: FormGroup;
  newPasswordFormGroup!: FormGroup;
  hide = true;
  isShow: boolean = false;
  phoneRegex = '(84|0[3|5|7|8|9])+([0-9]{8})';
  otpRegex = '([0-9]{4})';
  otpCountdownShow: boolean = false;
  otpTick = this.OTP_MAX_TICK; //seconds
  otpTimer!: Subscription;
  @Input() isDialog: boolean = true;
  @ViewChild('stepper') private stepper!: MatStepper;

  destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private storageService: StorageService,
    private router: Router,
    private _dialogRef: MatDialogRef<ResetPasswordFrameComponent>
  ) {}

  ngOnInit(): void {
    this.createForms();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  requestOTP(values: { phoneNumber: string }) {
    this.storageService.userInfo = {
      ...this.storageService.userInfo,
      phone_number: values.phoneNumber,
    };
    this.usersService
      .forgotPassword(this.storageService.userInfo, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.phoneFormGroup.get('phoneNumber')?.setErrors(null);
          this.goToNextStep();
          // this.storageService.userInfo = {
          //   ...this.storageService.userInfo,
          //   confirm_code: res.confirm_code
          // };
          this.startOtpTimer();
        },
        (err) => {
          this.phoneFormGroup
            .get('phoneNumber')
            ?.setErrors({ not_exist: true });
        }
      );
  }

  confirmOTP(values: { otp: string }) {
    // if (!!this.storageService.userInfo?.confirm_code
    //   && values.otp === this.storageService.userInfo?.confirm_code) {
    //   this.goToNextStep();
    // }
    this.storageService.userInfo = {
      ...this.storageService.userInfo,
      confirm_code: values.otp,
    };
    this.goToNextStep();
  }

  getError(el: any) {
    switch (el) {
      case 'phone':
        if (this.phoneFormGroup.get('phoneNumber')?.hasError('required')) {
          return 'Chưa nhập số điện thoại';
        } else if (
          this.phoneFormGroup.get('phoneNumber')?.hasError('pattern')
        ) {
          return 'Số điện thoại không đúng';
        } else if (
          this.phoneFormGroup.get('phoneNumber')?.hasError('not_exist')
        ) {
          return 'Số điện thoại không tồn tại';
        }
        break;
      case 'otp':
        if (this.otpFormGroup.get('otp')?.hasError('required')) {
          return 'Yêu cầu nhập mã xác nhận';
        } else if (
          this.otpFormGroup.get('otp')?.hasError('pattern') ||
          this.otpFormGroup.get('otp')?.hasError('invalid')
        ) {
          return 'Mã xác thực không đúng';
        }
        break;
      case 'password':
        if (this.newPasswordFormGroup.get('password')?.hasError('required')) {
          return 'Yêu cầu nhập mật khẩu';
        } else if (
          this.newPasswordFormGroup.get('password')?.hasError('minlength')
        ) {
          return 'Mật khẩu phải chứa tối thiểu 8 kí tự';
        }
        break;
      case 'confirm_password':
        if (
          this.newPasswordFormGroup
            .get('confirm_password')
            ?.hasError('required')
        ) {
          return 'Yêu cầu nhập lại mật khẩu xác thực';
        } else if (
          this.newPasswordFormGroup
            .get('confirm_password')
            ?.hasError('minlength')
        ) {
          return 'Mật khẩu xác thực phải chứa tối thiểu 8 kí tự';
        } else if (
          this.newPasswordFormGroup
            .get('confirm_password')
            ?.hasError('password_not_match')
        ) {
          return 'Mật khẩu xác thực không trùng khớp';
        }
        break;
      default:
        break;
    }

    return '';
  }

  goToNextStep() {
    this.stepper.next();
  }

  goToPreviousStep() {
    this.stepper.previous();
  }

  onResend() {
    this.storageService.userInfo = {
      ...this.storageService.userInfo,
      confirm_code: '',
    };
    this.stopOtpTimer();
    this.removeOtp();
    this.usersService
      .resendCode(this.storageService.userInfo, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.storageService.userInfo = {
          ...this.storageService.userInfo,
          confirm_code: res.confirm_code,
        };
        this.startOtpTimer();
      }, console.error);
  }

  resetPassword(values: {
    otp: string;
    password: string;
    confirm_password: string;
  }) {
    this.storageService.userInfo = {
      ...this.storageService.userInfo,
      password: values.password,
      confirm_code: values.otp,
    };

    this.usersService
      .resetPassword(this.storageService.userInfo, {})
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.storageService.userInfo = { ...res };
          // this.router.navigate(['/']);
          this._dialogRef.close();
        },
        (error) => console.error(error)
      );
  }

  private createForms() {
    this.phoneFormGroup = this.formBuilder.group({
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(this.phoneRegex)],
      ],
    });
    this.otpFormGroup = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern(this.otpRegex)]],
    });
    this.newPasswordFormGroup = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern(this.otpRegex)]],
      password: [
        '',
        [Validators.required, Validators.minLength(this.PASSWORD_MIN_LENGTH)],
      ],
      confirm_password: [
        '',
        [Validators.required, Validators.minLength(this.PASSWORD_MIN_LENGTH)],
      ],
    });
    this.createFormsEvents();
  }

  private createFormsEvents() {
    this.otpFormGroup
      .get('otp')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        if (
          !!this.storageService.userInfo?.confirm_code &&
          value === this.storageService.userInfo?.confirm_code
        ) {
          this.stopOtpTimer();
          this.otpFormGroup.get('otp')?.setErrors(null);
        } else {
          this.otpFormGroup.get('otp')?.setErrors({ invalid: true });
        }
      });
    this.newPasswordFormGroup
      .get('password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        const confirmPwField =
          this.newPasswordFormGroup.get('confirm_password');
        if (!!confirmPwField && value !== confirmPwField.value) {
          this.newPasswordFormGroup
            .get('confirm_password')
            ?.setErrors({ password_not_match: true });
        } else {
          this.newPasswordFormGroup.get('confirm_password')?.setErrors(null);
        }
      });
    this.newPasswordFormGroup
      .get('confirm_password')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        const pwField = this.newPasswordFormGroup.get('password');
        if (!!pwField && !!pwField.value && value !== pwField.value) {
          this.newPasswordFormGroup
            .get('confirm_password')
            ?.setErrors({ password_not_match: true });
        } else {
          this.newPasswordFormGroup.get('confirm_password')?.setErrors(null);
        }
      });
  }

  private startOtpTimer() {
    this.otpCountdownShow = true;
    this.otpTimer = timer(0, 1000).subscribe(() => {
      if (!--this.otpTick) {
        this.stopOtpTimer();
        this.removeOtp();
      }
    });
  }

  private stopOtpTimer() {
    this.otpCountdownShow = false;
    this.otpTick = this.OTP_MAX_TICK;
    if (!!this.otpTimer) {
      this.otpTimer.unsubscribe();
    }
  }

  private removeOtp() {
    this.storageService.userInfo = {
      ...this.storageService.userInfo,
      confirm_code: '',
    };
  }
}
