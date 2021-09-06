import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../../../core/http/authen.service';

@Component({
  selector: 'login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.scss'],
})
export class LoginFrameComponent implements OnInit {
  formGroup!: FormGroup;
  hide = true;
  isShow: boolean = false;
  regex = '(84|0[3|5|7|8|9])+([0-9]{8})';
  @Input() isDialog: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authenService: AuthenService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      numberphone: ['', [Validators.required, Validators.pattern(this.regex)]],
      password: ['', Validators.required],
    });
  }

  onSubmit(values: { numberphone: string; password: string }) {
    this.authenService
      .signin(values.numberphone, values.password)
      .subscribe((result) => {
        console.log(result);
        this.router.navigateByUrl('/home');
      });
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
}
