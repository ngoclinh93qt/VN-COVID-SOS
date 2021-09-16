import { ScrollTrackerDirective } from './../../directives/scroll-tracker.directive';
import { Component, EventEmitter, Input, OnInit, Output, Directive } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestCardDetailsComponent } from '../request-card-details/request-card-details.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-request-container',
  templateUrl: './request-container.component.html',
  styleUrls: ['./request-container.component.scss']
})
export class RequestContainerComponent implements OnInit {
  @Output() scrollingFinished = new EventEmitter<void>();
  @Input() requests?: ISOSRequest[];
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
  chooseRequest(request: ISOSRequest) {
    const dialogRef = this.bottomsheet.open(RequestCardDetailsComponent, {
      data: { request, session: this.session },
      hasBackdrop: false
    });

    dialogRef.afterDismissed().subscribe(res => this.requests = this.requests?.map(element => element.id === res.id ? res : element))

  }

}
