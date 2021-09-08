import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestCardDetailsComponent } from '../request-card-details/request-card-details.component';

@Component({
  selector: 'app-request-container',
  templateUrl: './request-container.component.html',
  styleUrls: ['./request-container.component.scss']
})
export class RequestContainerComponent implements OnInit {
  @Input() requests?: ISOSRequest[];
  constructor(
    public dialog: MatDialog
  ) {

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
