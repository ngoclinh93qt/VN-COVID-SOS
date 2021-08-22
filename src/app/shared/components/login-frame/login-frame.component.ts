import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenService } from '../../services/rest-services/authen.service';

@Component({
  selector: 'login-frame',
  templateUrl: './login-frame.component.html',
  styleUrls: ['./login-frame.component.scss'],
})
export class LoginFrameComponent implements OnInit {
  formGroup!: FormGroup;
  hide = true;
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
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(values: { username: string; password: string }) {
    console.log(this.formGroup.value);
    //  this.authenService.signin("sos.demo@mailnesia.com", "123456789").subscribe(result=>{})
    this.authenService
      .signin(values.username, values.password)
      .subscribe((result) => {console.log(result);this.router.navigateByUrl('/home');});
  }

  getError(el: any) {
    switch (el) {
      case 'user':
        if (this.formGroup.get('username')?.hasError('required')) {
          return 'Username required';
        }
        return '';
        break;
      case 'pass':
        if (this.formGroup.get('password')?.hasError('required')) {
          return 'Password required';
        }
        return '';
        break;
      default:
        return '';
    }
  }
}
