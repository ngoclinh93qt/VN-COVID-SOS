import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.scss']
})
export class LoginFrameComponent implements OnInit {
  formGroup!: FormGroup;
  hide = true;
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  onSubmit(values: any) {
    console.log(this.formGroup.value)
  }


  getError(el: any) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('username')?.hasError('required')) {
          return 'Username required';
        }
        return ''
        break;
      case 'pass':
        if (this.formGroup.get('password')?.hasError('required')) {
          return 'Password required';
        }
        return ''
        break;
      default:
        return '';
    }
  }
}
