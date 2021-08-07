import { UrgentRequestService } from './../../core/services/rest-services/urgent-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-urgent-request',
  templateUrl: './urgent-request.component.html',
  styleUrls: ['./urgent-request.component.scss']
})
export class UrgentRequestComponent implements OnInit {
  requests: IUrgentRequest[] = [];
  constructor(private UrgentRequestService: UrgentRequestService) {
    this.requests = UrgentRequestService.getRequest();
  }

  ngOnInit(): void {
  }

}
