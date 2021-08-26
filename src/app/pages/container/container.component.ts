import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  showFiller = true;
  sideItems: SideItem[] | undefined;

  constructor() {}

  ngOnInit(): void {
    this.sideItems = [
      {
        name: 'Tổng quan',
        icon: 'home',
        url: 'home',
      },
      {
        name: 'Yêu cầu khẩn cấp',
        icon: 'support',
        url: 'urgentRequest',
      },
      {
        name: 'Bệnh viện',
        icon: 'local_hospital',
        url: 'hospital',
      },
      {
        name: 'Nhóm thiện nguyện',
        icon: 'group',
        url: 'group',
      },
      {
        name: 'Quản lí',
        icon: 'inventory',
        url: 'manage',
      },
    ];
  }
}
type SideItem = {
  name: string;
  icon: string;
  url: string;
};
