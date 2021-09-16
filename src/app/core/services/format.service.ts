import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  constructor() {}

  format(array?: any[]) {
    if (!array) {
      return array;
    } else {
      for (let i = 0; i < array!.length; i++) {
        const number = array![i].name?.replace(/[^0-9]/g, '');
        if (number?.length == 1) {
          const index = array![i].name?.indexOf(number);
          const newname = [
            array![i].name?.slice(0, index),
            '0',
            array![i].name?.slice(index),
          ].join('');
          array![i].name = newname;
        }
      }
      return array;
    }
  }
}
