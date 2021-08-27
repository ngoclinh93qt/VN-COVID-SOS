import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserLoginService } from 'src/app/core/http/user-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  formGroup!: FormGroup;
  formConfirm!: FormGroup;
  isConfirmed: boolean = false;
  userID: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private UserLoginService: UserLoginService,
    private router: Router
  ) {}

  createForm() {
    this.formGroup = this.formBuilder.group({
      phone_number: ['', [Validators.required, Validators.minLength(10)]],
    });
    this.formConfirm = this.formBuilder.group({
      confirm_code: ['', Validators.required],
    });
  }

  getError(el: any) {
    switch (el) {
      case 'phone':
        if (this.formGroup.get('phone_number')?.hasError('required')) {
          return 'Phone number required';
        }
        if (this.formGroup.get('phone_number')?.hasError('minlength')) {
          return 'phone number at least 10 characters';
        }
        return '';
        break;
      case 'confirm_code':
        if (this.formGroup.get('confirm_code')?.hasError('required')) {
          return 'Phone number required';
        }
        return '';
        break;
      default:
        return '';
    }
  }

  onSubmit(values: { phone_number: String }) {
    console.log(this.formGroup.value);

    this.UserLoginService.getConfirmCode(values.phone_number).subscribe(
      (result) => {
        if (result.status === 'success') {
          this.isConfirmed = true;
          this.userID = result.data.customer_id;
        }
      }
    );
  }

  onConfirm(values: { confirm_code: String }) {
    console.log(this.formConfirm.value);
    this.UserLoginService.login(values.confirm_code, this.userID).subscribe(
      (result) => {
        if (result.status === 'success') {
          this.router.navigateByUrl('/home');
        }
      }
    );
  }

  ngOnInit(): void {
    this.createForm();
  }
}
