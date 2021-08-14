import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISupportType } from 'src/typings';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class SupportTypesService  extends RestService<ISupportType>{

  constructor(http: HttpClient) {
    super(http, 'support_types')
  }
  getSupportTypes(){
    return this.support_types;
  }
  support_types: ISupportType[] = [
    {
      name:"Nhu Yếu Phẩm",
      type:"nhu_yeu_pham"
    },
    {
      name:"Vật Dụng Y Tế",
      type:"vat_dung_y_te"
    },
    {
      name:"Tư Vấn Y Khoa",
      type:"tu_van_y_khoa"
    }
  ]
}
