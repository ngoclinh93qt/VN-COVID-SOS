import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/core/http/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone_number: ['', Validators.required],
      first_name: '',
      last_name: '',
    });
  }

  getError(el: any) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('username')?.hasError('required')) {
          return 'Username required';
        }
        if (this.formGroup.get('username')?.hasError('minlength')) {
          return 'min length 8 characters';
        }
        return '';
        break;
      case 'pass':
        if (this.formGroup.get('password')?.hasError('required')) {
          return 'Password required';
        }
        if (this.formGroup.get('password')?.hasError('minlength')) {
          return 'min length 8 characters';
        }
        return '';
        break;
      case 'phone':
        if (this.formGroup.get('phone_number')?.hasError('required')) {
          return 'Phone required';
        }
        return '';
        break;
      default:
        return '';
    }
  }

  onSubmit(values: {
    username: string;
    password: string;
    phone_number: string;
    first_name: string;
    last_name: string;
  }) {
    console.log(this.formGroup.value);
    this.signupService
      .signup(
        values.username,
        values.password,
        values.phone_number,
        values.first_name,
        values.last_name
      )
      .subscribe((result) => {});
  }
}
