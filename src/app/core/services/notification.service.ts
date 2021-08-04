import { Injectable } from '@angular/core';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor() { }

  // infoNotification() {
  //   this._snackBar.openFromComponent(NotificationComponent, {
  //     horizontalPosition: 'end',
  //     verticalPosition: 'bottom',
  //   });
  // }
}
