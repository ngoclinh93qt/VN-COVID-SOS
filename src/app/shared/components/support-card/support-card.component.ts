import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-support-card',
  templateUrl: './support-card.component.html',
  styleUrls: ['./support-card.component.scss'],
})
export class SupportCardComponent implements OnInit {
  @Input() supporter?: any;

  constructor() {}

  ngOnInit(): void {}
}
