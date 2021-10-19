import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NdaDialogComponent } from '../nda-dialog/nda-dialog.component';

@Component({
  selector: 'app-nda',
  templateUrl: './nda.component.html',
  styleUrls: ['./nda.component.scss']
})
export class NdaComponent implements OnInit {

  @Output() acceptEvent = new EventEmitter<boolean>();
  statusList: string[] = [];
  isAccept = false;
  constructor(
  ) {
  }
  ngOnInit(): void {
  }

  clickAccept(){
    this.acceptEvent.emit(this.isAccept)
  }

}
