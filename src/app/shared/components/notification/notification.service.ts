import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  info(message: string,  duration?: number) {
    this.openSnackBar('info', message, 'infoNotif',duration);
  }

  success(message: string,  duration?: number) {
    this.openSnackBar('success', message, 'successNotif',duration);
  }

  warn(message: string,  duration?: number) {
    this.openSnackBar('warn', message, 'warnNotif',duration);
  }

  error(message: string,  duration?: number) {
    this.openSnackBar('error', message, 'errNotif', duration);
  }

  openSnackBar(type: NotificationType, message: string, style: string, duration?: number) {
    this._snackBar.openFromComponent(NotificationComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: duration || 2000,
      data: {
        type: type,
        message: message,
      },
      panelClass: [style],
    });
  }
}

export type NotificationType = 'info' | 'success' | 'warn' | 'error';

export type NotificationData = {
  type: 'info'| 'success' | 'warn' | 'error';
  message: string;
};
