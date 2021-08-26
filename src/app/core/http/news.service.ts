import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService extends RestService<INew> {
  constructor(http: HttpClient) {
    super(http, 'news');
  }
  getRequestNews(id?: string): Observable<INew[]> {
    return this.http
      .get<{
        data: INew[];
      }>(`${this.host}/news?filter_target_id=${id}`, {})
      .pipe(map((res) => res.data));
  }
  getNews() {
    return this.news;
  }
  publisher: IPublisher = {
    id: '1',
    img:
      'data:image/png;base64,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',
    name: 'Tuổi trẻ',
  };
  news: INews[] = [
    {
      id: '1',
      header:
        'Nghệ An ghi nhận thêm 12 trường hợp dương tính với SARS-CoV-2 từ các tỉnh phía Nam trở về',
      content:
        'Tối 4/8, ông Nguyễn Văn Định – Giám đốc Trung tâm Kiểm soát bệnh tật Nghệ An cho biết, địa bàn ghi nhận thêm 12 ca dương tính với SARS-CoV-2. Các ca mắc mới này đều là công dân từ các tỉnh phía Nam trở về. Trong đó, TP.HCM 8 ca, Bình Dương 3 ca, Đồng Nai 1 ca.',
      img:
        'https://giadinh.mediacdn.vn/296230595582509056/2021/8/4/2331330408949732177649465161016347773809642n-1628080666865346919869.jpg',
      publisher: this.publisher,
      pubDate: new Date(),
    },
    {
      id: '2',
      header:
        'Nghệ An ghi nhận thêm 12 trường hợp dương tính với SARS-CoV-2 từ các tỉnh phía Nam trở về',
      content:
        'Tối 4/8, ông Nguyễn Văn Định – Giám đốc Trung tâm Kiểm soát bệnh tật Nghệ An cho biết, địa bàn ghi nhận thêm 12 ca dương tính với SARS-CoV-2. Các ca mắc mới này đều là công dân từ các tỉnh phía Nam trở về. Trong đó, TP.HCM 8 ca, Bình Dương 3 ca, Đồng Nai 1 ca.',
      img:
        'https://giadinh.mediacdn.vn/296230595582509056/2021/8/4/2331330408949732177649465161016347773809642n-1628080666865346919869.jpg',
      publisher: this.publisher,
      pubDate: new Date(),
    },
    {
      id: '3',
      header:
        'Nghệ An ghi nhận thêm 12 trường hợp dương tính với SARS-CoV-2 từ các tỉnh phía Nam trở về',
      content:
        'Tối 4/8, ông Nguyễn Văn Định – Giám đốc Trung tâm Kiểm soát bệnh tật Nghệ An cho biết, địa bàn ghi nhận thêm 12 ca dương tính với SARS-CoV-2. Các ca mắc mới này đều là công dân từ các tỉnh phía Nam trở về. Trong đó, TP.HCM 8 ca, Bình Dương 3 ca, Đồng Nai 1 ca.',
      img:
        'https://giadinh.mediacdn.vn/296230595582509056/2021/8/4/2331330408949732177649465161016347773809642n-1628080666865346919869.jpg',
      publisher: this.publisher,
      pubDate: new Date(),
    },
    {
      id: '4',
      header:
        'Nghệ An ghi nhận thêm 12 trường hợp dương tính với SARS-CoV-2 từ các tỉnh phía Nam trở về',
      content:
        'Tối 4/8, ông Nguyễn Văn Định – Giám đốc Trung tâm Kiểm soát bệnh tật Nghệ An cho biết, địa bàn ghi nhận thêm 12 ca dương tính với SARS-CoV-2. Các ca mắc mới này đều là công dân từ các tỉnh phía Nam trở về. Trong đó, TP.HCM 8 ca, Bình Dương 3 ca, Đồng Nai 1 ca.',
      img:
        'https://giadinh.mediacdn.vn/296230595582509056/2021/8/4/2331330408949732177649465161016347773809642n-1628080666865346919869.jpg',
      publisher: this.publisher,
      pubDate: new Date(),
    },
  ];
}
