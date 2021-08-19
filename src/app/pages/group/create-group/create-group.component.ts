import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss'],
})
export class CreateGroupComponent implements OnInit {
  constructor(private _dialogRef: MatDialogRef<CreateGroupComponent>) {}

  CloseDialog() {
    this._dialogRef.close();
  }

  ngOnInit(): void {}
}
