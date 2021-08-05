import { NewsService } from './../../../core/services/rest-services/news.service';
import { HandbookService } from './../../../core/services/rest-services/handbook.service';
import { Component, OnInit } from '@angular/core';

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
