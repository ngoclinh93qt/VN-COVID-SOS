import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {
  @Input() request?: ISOSRequest = {};
  @Input() type?: string = "";
  mapPriority = new Map();
  mapStatus = new Map();
  @Output() clickedRequest = new EventEmitter<ISOSRequest>();
  constructor() {
    this.mapPriority.set("high", "Rất nguy cấp");
    this.mapPriority.set("normal", "Nguy cấp")
    this.mapPriority.set("","Nguy cấp")
    this.mapStatus.set("", "Đang chờ hỗ trợ");
    this.mapStatus.set("waiting", "Đang chờ hỗ trợ");
    this.mapStatus.set("supporting", "Đang được hỗ trợ");
  }
  chooseRequest(request: ISOSRequest) {
    this.clickedRequest.emit(request)
    console.log(request);
  }
  ngOnInit(): void {

  }

}
