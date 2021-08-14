import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-request-card-details',
  templateUrl: './request-card-details.component.html',
  styleUrls: ['./request-card-details.component.scss']
})
export class RequestCardDetailsComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() request?: ISOSRequest = {};
  constructor() { }
  color = {
    accent: 'accent',
    primary: 'primary',
    warn: 'warn',
    basic: 'basic'
  }
  selectedColor = 'warn'
  selectedIcon = "local_hospital"
  icon = {
    home: 'home',
    menu: 'menu',
    favorite: 'favorite',
    sort: 'sort',
    filter: 'filter',
    hospital: 'local_hospital',
    done: 'done',
    alert: 'error',
    fastfood: 'fastfood',
    close: 'close'

  };
  type = 'icon';
  height = {
    small: '32',
    large: '40'
  }
  text = {
    ratnguycap: 'Rất Nguy Cấp',
    nguycap: 'Nguy Cấp',
    daxacthuc: 'Đã Xác Thực',
    yte: 'Y tế',
    dothietyeu: 'Đồ Thiết Yếu'
  }
  status = "Rất Nguy Cấp";
  typeRequest = "Y tế";
  onclose() {
    this.close.emit();
    console.log("close");
  } 
  length =0;
  pageSize = 1;

  // MatPaginator Output
  pageEvent: PageEvent | undefined;

 
  ngOnInit(): void {
    if (this.request?.status != 'RẤT NGUY CẤP') { this.selectedColor = this.color.accent; this.status = "Nguy Cấp" }
    if (this.request?.support_types?.length != 0) this.typeRequest = this.request?.support_types?.[0]?.name!;
    this.length=this.request?.medias?.length!;
    this.pageEvent!.pageIndex=0;
  }

}
