import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-clinic-container',
  templateUrl: './clinic-container.component.html',
  styleUrls: ['./clinic-container.component.scss']
})
export class ClinicContainerComponent implements OnInit {

  @Output() scrollingFinished = new EventEmitter<void>();
  @Input() clinics?: IGroup[];
  @Input() type?: String;
  @Input() session?: String;


  constructor(
    private bottomsheet: MatBottomSheet
  ) {

  }
  ngOnInit(): void {
  }
  onScrollingFinished() {
    console.log("scroll end")
    this.scrollingFinished.emit();
  }
  chooseClinic(clinic: IGroup) {
    // const dialogRef = this.bottomsheet.open('<p></p>', {
    //   data: { clinic, session: this.session },
    //   hasBackdrop: false
    // });

    // dialogRef.afterDismissed().subscribe(res => this.clinics = this.clinics?.map(element => element.id === res.id ? res : element))

  }

}
