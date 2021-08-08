import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospital-sidenav',
  templateUrl: './hospital-sidenav.component.html',
  styleUrls: ['./hospital-sidenav.component.scss'],
})
export class HospitalSidenavComponent implements OnInit {
  lastestComment: IComment[];
  historyComment: IComment[];

  constructor() {
    this.lastestComment = [
      {
        content: 'Bệnh viện tạm thời không cần gì.',
        postTime: '10:30 AM . Hôm nay',
      },
      {
        content: 'Bệnh viện 100 may tho',
        postTime: '10:30 AM . Hôm nay',
      },
    ];
    this.historyComment = [
      {
        content: 'Bệnh viện tạm thời không cần gì.',
        postTime: '10:30 AM . Hôm nay',
      },
    ];
  }

  ngOnInit(): void {}
}
