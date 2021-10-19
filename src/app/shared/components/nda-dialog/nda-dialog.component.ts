import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-nda-dialog',
  templateUrl: './nda-dialog.component.html',
  styleUrls: ['./nda-dialog.component.scss']
})
export class NdaDialogComponent implements OnInit {
  @Output() acceptEvent = new EventEmitter<boolean>();
  statusList: string[] = [];
  isAccept = false;
  constructor(
    private _dialogRef: MatDialogRef<NdaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }
  ngOnInit(): void {
  }

  onClose(isAccept?: boolean){
    if(isAccept){
      this._dialogRef.close(this.isAccept)
      return
    }
    this._dialogRef.close()
  }
  checkAccept(isAccept: boolean){
    this.isAccept= isAccept;
  }
}
