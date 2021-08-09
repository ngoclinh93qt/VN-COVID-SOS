import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  info(message: NotificationType){
    this.openSnackBar('info', message)
  }

  warn(message: NotificationType){
    this.openSnackBar('warn', message )
  }

  error(message: NotificationType){
    this.openSnackBar('error', message)
  }

  openSnackBar(type: NotificationType, message: string){
    this._snackBar.openFromComponent(NotificationComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1000,
      data: {
        type: type,
        message: message
      }
    });
  }

}

export type NotificationType = 'info' | 'warn' | 'error';


export type NotificationData = {
  type: 'info' | 'warn' | 'error';
  message: string;
}