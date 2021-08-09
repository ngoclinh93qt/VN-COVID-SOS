import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LoginFrameComponent } from 'src/app/shared/components/login-frame/login-frame.component';

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
