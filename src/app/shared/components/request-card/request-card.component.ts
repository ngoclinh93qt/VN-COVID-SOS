import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ISOSRequest } from 'src/typings';

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
    fastfood: 'fastfood'

  };
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
  ngOnInit(): void {
    if (this.request?.status != 'RẤT NGUY CẤP') { this.selectedColor = this.color.accent; this.status = "Nguy Cấp" }
    if (this.request?.support_types?.length!=0) this.typeRequest=this.request?.support_types?.[0]?.name!;
  }

}
