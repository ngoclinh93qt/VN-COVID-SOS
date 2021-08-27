import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trans-card',
  templateUrl: './trans-card.component.html',
  styleUrls: ['./trans-card.component.scss'],
})
export class TransCardComponent implements OnInit {
  @Input() trans?: ITransaction;
  constructor() {}

  ngOnInit(): void {}
}
