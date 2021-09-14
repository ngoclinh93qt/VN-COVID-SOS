import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SupportObjectService {
  constructor() {}
  thucpham: ISupport[] = [
    {
      name: 'gạo',
      amount: 1,
      type: 'gao',
      unit: 'kg',
    },
    {
      name: 'rau',
      amount: 1,
      type: 'rau',
      unit: 'kg',
    },
    {
      name: 'trứng',
      amount: 1,
      type: 'trung',
      unit: 'quả',
    },
  ];
  yte: ISupport[] = [
    {
      name: 'máy thở',
      amount: 1,
      type: 'may_tho',
      unit: 'cái',
    },
    {
      name: 'kit xét nghiệm',
      amount: 1,
      type: 'bo_kit_xet_nghiem',
      unit: 'bộ',
    },
    {
      name: 'vắc xin',
      amount: 1,
      type: 'vac_xin',
      unit: 'mẫu',
    },
  ];
  SupportObjectMap = new Map([
    ['thuc_pham', this.thucpham],
    ['dung_cu_y_te', this.yte],
  ]);
  getSupportObjectByType(supportType: ISupportType[]) {
    let res: ISupport[] = [];
    supportType.forEach((support) => {
      let x = this.SupportObjectMap.get(support.type!);
      if (x != undefined) res.push(...x);
    });
    return res;
  }
}
