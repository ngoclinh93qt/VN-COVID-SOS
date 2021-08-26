import { Component, OnInit } from '@angular/core';
import { HandbookService } from 'src/app/core/http/handbook.service';
import { NewsService } from 'src/app/core/http/news.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  handbooks: IHandBook[] = [];
  news: INews[] = [];
  constructor(
    private HandbookService: HandbookService,
    private NewsService: NewsService
  ) {
    this.handbooks = HandbookService.getHandBooks();
    this.news = NewsService.getNews();
  }

  ngOnInit(): void {}
}
