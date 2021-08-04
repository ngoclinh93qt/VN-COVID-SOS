import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.scss']
})
export class AuthenComponent implements OnInit {
  formGroup!: FormGroup;
  hide = true;
  
  constructor(private formBuilder: FormBuilder) {
    this.createForm();
   }

  ngOnInit() {
   
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
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

  onSubmit(values: any) {
    // login
  }
}
