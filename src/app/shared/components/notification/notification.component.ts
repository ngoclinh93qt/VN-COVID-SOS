import { Component, forwardRef, Inject, OnInit } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import {
  NotificationType,
  NotificationData,
  NotificationService,
} from 'src/app/shared/components/notification/notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  type: NotificationType = 'info';
  message: string = '';
  constructor(
    private notifcationService: NotificationService,
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData
  ) {}

  ngOnInit(): void {
    this.type = this.data.type;
    this.message = this.data.message;
  }
}
