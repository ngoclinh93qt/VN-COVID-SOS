import { UrgentRequestService } from './../../../core/services/rest-services/urgent-request.service';
import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-request-container',
  templateUrl: './request-container.component.html',
  styleUrls: ['./request-container.component.scss']
})
export class RequestContainerComponent implements OnInit {

  @Input() requests?: IUrgentRequest[];
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

  constructor() {

  }
  ngOnInit(): void {

  }

}
