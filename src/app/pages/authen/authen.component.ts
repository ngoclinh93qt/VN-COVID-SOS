import { Component, OnInit } from '@angular/core';
import { LoginFrameComponent } from 'src/app/shared/components/login-frame/login-frame.component';
import { DialogService } from 'src/app/shared/services/common-services/dialog.service';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.scss']
})
export class AuthenComponent implements OnInit {
  
  constructor(private dialogService: DialogService) {
    // dialogService.openDialog(LoginFrameComponent, {width: '100%', maxWidth: '455px'})
   }

  ngOnInit() {
   
  }

}
