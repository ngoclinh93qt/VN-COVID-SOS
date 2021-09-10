import { ScrollTrackerDirective } from './../../directives/scroll-tracker.directive';
import { Component, EventEmitter, Input, OnInit, Output, Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestCardDetailsComponent } from '../request-card-details/request-card-details.component';

@Component({
  selector: 'app-request-container',
  templateUrl: './request-container.component.html',
  styleUrls: ['./request-container.component.scss']
})
export class RequestContainerComponent implements OnInit {
  @Output() scrollingFinished = new EventEmitter<void>();
  @Input() requests?: ISOSRequest[];
  @Input() type?: String;
  constructor(
    public dialog: MatDialog
  ) {

  }
  ngOnInit(): void {

  }
  onScrollingFinished() {
    console.log("scroll end")
    this.scrollingFinished.emit();
  }
  chooseRequest(request: ISOSRequest) {
    const dialogRef = this.dialog.open(RequestCardDetailsComponent, {
      width: '100vw',
      height: '100vh',
      data: request,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
