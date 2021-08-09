
import { Component, OnInit } from '@angular/core';
import { UrgentRequestService } from 'src/app/shared/services/rest-services/urgent-request.service';

@Component({
  selector: 'app-urgent-request',
  templateUrl: './urgent-request.component.html',
  styleUrls: ['./urgent-request.component.scss']
})
export class UrgentRequestComponent implements OnInit {
  requests: IUrgentRequest[] = [];
  focusRequest: IUrgentRequest = {};
  constructor(private UrgentRequestService: UrgentRequestService) {
    this.requests = UrgentRequestService.getRequest();
  }

  chooseRequest(request:IUrgentRequest)
  {
    this.focusRequest=request;
  }
  
  closeFocus()
  {
    this.focusRequest={};
  }
  ngOnInit(): void {
  }

}
