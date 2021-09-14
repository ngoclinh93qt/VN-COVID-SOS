import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/components/notification/notification.component';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  info(message: string) {
    this.openSnackBar('info', message, 'infoNotif');
  }

  success(message: string) {
    this.openSnackBar('success', message, 'successNotif');
  }

  warn(message: string) {
    this.openSnackBar('warn', message, 'warnNotif');
  }

  error(message: string) {
    this.openSnackBar('error', message, 'errNotif');
  }

  openSnackBar(type: NotificationType, message: string, style: string) {
    this._snackBar.openFromComponent(NotificationComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2000,
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
