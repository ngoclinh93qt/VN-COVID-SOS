import { Injectable } from '@angular/core';
import { ISupportType } from 'src/typings';

@Injectable({
  providedIn: 'root'
})
export class SupportTypesService {

  constructor() { }
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
