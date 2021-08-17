import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent implements OnInit {
  @Input() request?: ISOSRequest = {};
  @Output() clickedRequest = new EventEmitter<ISOSRequest>();
  constructor() { }
  chooseRequest(request: ISOSRequest) {
    this.clickedRequest.emit(request)
    console.log(request);
  }
 
  status = "Rất Nguy Cấp";
  typeRequest = "Y tế";
  ngOnInit(): void {
    if (this.request?.status != 'RẤT NGUY CẤP') { this.status = "Nguy Cấp" }
    if (this.request?.support_types?.length!=0) this.typeRequest=this.request?.support_types?.[0]?.name!;
  }

}
