import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
@Injectable({
  providedIn: 'root',
})
export class HandbookService extends RestService<IHandBook> {
  public model: any;
  constructor(http: HttpClient) {
    super(http, '');
  }

  getHandBooks() {
    return this.handBooks;
  }

  handBooks: IHandBook[] = [
    {
      id: '1',
      name: 'Cẩm nang F0 - 1',
      content:
        'Khoảng 80% bệnh nhân Covid-19 ở thể nhẹ, chỉ ho, mệt, sốt nhẹ và tự hồi phục sau 7-10 ngày, 20% bệnh nhân chuyển nặng, thường trong 5-8 ngày. Nếu biểu hiện bệnh nhẹ, bạn có thể tham khảo các bước sau',
    },
    {
      id: '2',
      name: 'Cẩm nang F0 - 2',
      content:
        'Khoảng 80% bệnh nhân Covid-19 ở thể nhẹ, chỉ ho, mệt, sốt nhẹ và tự hồi phục sau 7-10 ngày, 20% bệnh nhân chuyển nặng, thường trong 5-8 ngày. Nếu biểu hiện bệnh nhẹ, bạn có thể tham khảo các bước sau',
    },
  ];
}
