import { Component, OnInit } from '@angular/core';
import { LoginFrameComponent } from 'src/app/shared/components/login-frame/login-frame.component';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { DialogService } from 'src/app/shared/services/common-services/dialog.service';
import { StorageService } from 'src/app/shared/services/common-services/storage.service';

@Component({
  selector: 'app-authen',
  templateUrl: './authen.component.html',
  styleUrls: ['./authen.component.scss']
})
export class AuthenComponent implements OnInit {
  
  constructor(private dialogService: DialogService, private notification: NotificationService, private storage: StorageService) {
    // dialogService.openDialog(LoginFrameComponent, {width: '100%', maxWidth: '455px'})
    this.notification.info("huhu");
    this.notification.error("huhu");
   }

  ngOnInit() {
   
  }

}
