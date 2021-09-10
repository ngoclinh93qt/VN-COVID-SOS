import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { finalize } from 'rxjs/operators';
import { ResetPasswordService } from 'src/app/core/http/reset-password.service';

@Component({
  selector: 'app-reset-password-frame',
  templateUrl: './reset-password-frame.component.html',
  styleUrls: ['./reset-password-frame.component.scss']
})
export class ResetPasswordFrameComponent implements OnInit {
  phoneFormGroup!: FormGroup;
  otpFormGroup!: FormGroup;
  hide = true;
  isShow: boolean = false;
  phoneRegex = '(84|0[3|5|7|8|9])+([0-9]{8})';
  otpRegex = '([0-9]{4})';
  @Input() isDialog: boolean = true;
  @ViewChild('stepper') private stepper!: MatStepper;

  private otp: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
  ) { }

  ngOnInit(): void {
    this.createForms();
  }

  createForms() {
    this.phoneFormGroup = this.formBuilder.group({
      phoneNumber: ['', [Validators.required, Validators.pattern(this.phoneRegex)]],
    });
    this.otpFormGroup = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern(this.otpRegex)]],
    });
  }

  requestOTP(values: { phoneNumber: string }) {
    console.log({ values });
    this.resetPasswordService.forgotPassword(values.phoneNumber).pipe(
      // TODO only go to next step if success
      finalize(() => this.goToNextStep())
    ).subscribe(res => {
      console.log(res);
    }, console.error);
  }

  confirmOTP(values: { otp: string }) {
    console.log({ values });
    this.goToNextStep();
  }

  getError(el: any) {
    switch (el) {
      case 'phone':
        if (this.phoneFormGroup.get('phoneNumber')?.hasError('required')) {
          return 'Chưa nhập số điện thoại';
        } else if (this.phoneFormGroup.get('phoneNumber')?.hasError('pattern')) {
          return 'Số điện thoại không đúng';
        }
        break;
      case 'otp':
        if (this.otpFormGroup.get('otp')?.hasError('required')) {
          return 'Chưa nhập OTP';
        } else if (this.otpFormGroup.get('otp')?.hasError('pattern')) {
          return 'OTP không đúng';
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

}
