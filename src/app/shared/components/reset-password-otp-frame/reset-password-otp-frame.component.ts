import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reset-password-otp-frame',
  templateUrl: './reset-password-otp-frame.component.html',
  styleUrls: ['./reset-password-otp-frame.component.scss']
})
export class ResetPasswordOtpFrameComponent implements OnInit {
  formGroup!: FormGroup;
  hide = true;
  isShow: boolean = false;
  regex = '([0-9]{4})';
  @Input() isDialog: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern(this.regex)]],
    });
  }

  onSubmit(values: { otp: string }) {
    // TODO: call reset password service / API
  }

  getError(el: any) {
    switch (el) {
      case 'phone':
        if (this.formGroup.get('phoneNumber')?.hasError('required')) {
          return 'Chưa nhập số điện thoại';
        } else if (this.formGroup.get('phoneNumber')?.hasError('pattern')) {
          return 'Số điện thoại không đúng';
        }
        break;
      case 'pass':
        if (this.formGroup.get('password')?.hasError('required')) {
          return 'Chưa nhập mật khẩu';
        }
        break;
      default:
        break;
    }

    return '';
  }

}
