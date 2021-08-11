import { RequestStatusService } from './../../../shared/services/rest-services/request-status.service';
import { SupportTypesService } from './../../../shared/services/rest-services/support-types.service';
import { UrgentLevelService } from './../../../shared/services/rest-services/urgent-level.service';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISOSRequest, IUrgentRequest, ISupportType } from 'src/typings';

@Component({
  selector: 'app-request-container',
  templateUrl: './request-container.component.html',
  styleUrls: ['./request-container.component.scss']
})
export class RequestContainerComponent implements OnInit {

  @Input() requests?: ISOSRequest[];
  @Output() clickedRequest = new EventEmitter<ISOSRequest>();
  @Output() createClicked = new EventEmitter();
  urgentLevels: string[] = [];
  statuses: string[] = [];
  supportTypes: ISupportType[] = [];
  constructor(private UrgentLevelService: UrgentLevelService, private SupportTypesService: SupportTypesService, private RequestStatusService: RequestStatusService) {
    this.statuses=RequestStatusService.getRequestStatus();
    this.urgentLevels=UrgentLevelService.getUrgentLevels();
    this.supportTypes=this.SupportTypesService.getSupportTypes();
  }
  chooseRequest(request: ISOSRequest) {
    this.clickedRequest.emit(request)
    console.log(request);
  }
  createClick(){
    this.createClicked.emit();
  }


  color = {
    accent: 'accent',
    primary: 'primary',
    warn: 'warn',
    basic: 'basic'
  }
  icon = {
    home: 'home',
    menu: 'menu',
    favorite: 'favorite',
    sort: 'sort',
    filter: 'filter',
  };
  height = {
    small: '40',
    large: '50'
  }
  text = {
    createRequest: "Tạo Yêu Cầu", filter: 'Bộ lọc',
  }

  ngOnInit(): void {
    console.log(this.requests);
  }

}
