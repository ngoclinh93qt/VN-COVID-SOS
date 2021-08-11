import { Component, OnInit } from '@angular/core';
import { HandbookService } from 'src/app/shared/services/rest-services/handbook.service';
import { NewsService } from 'src/app/shared/services/rest-services/news.service';
import { IHandBook, INews } from 'src/typings';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  handbooks: IHandBook[] = [];
  news: INews[] = [];
  constructor(private HandbookService: HandbookService, private NewsService: NewsService) {
    this.handbooks=HandbookService.getHandBooks();
    this.news=NewsService.getNews();
  }

  ngOnInit(): void {
  }

}
