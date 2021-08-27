import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-status-dialog',
  templateUrl: './status-dialog.component.html',
  styleUrls: ['./status-dialog.component.scss'],
})
export class StatusDialogComponent implements OnInit {
  constructor(private _dialogRef: MatDialogRef<StatusDialogComponent>) {}

  CloseDialog() {
    this._dialogRef.close();
  }

  ngOnInit(): void {}
}
