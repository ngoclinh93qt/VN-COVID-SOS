import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-request-card-details',
  templateUrl: './request-card-details.component.html',
  styleUrls: ['./request-card-details.component.scss']
})
export class RequestCardDetailsComponent implements OnInit {
  @Output() close = new EventEmitter();
  @Input() request?: IUrgentRequest = {};
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
  type='icon';
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
  onclose(){
    this.close.emit();
    console.log("close");
  }
  ngOnInit(): void {
    if (this.request?.status != 'RẤT NGUY CẤP') { this.selectedColor = this.color.accent; this.status = "Nguy Cấp" }
    if (this.request?.typeRequest != "Y tế") { this.typeRequest = this.text.dothietyeu; this.selectedIcon = this.icon.fastfood; }
  }

}
