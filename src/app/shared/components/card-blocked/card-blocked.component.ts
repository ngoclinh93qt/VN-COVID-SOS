import { Component, OnInit, Input } from '@angular/core';
import { Blocked } from 'src/app/pages/blocked/model/blocked.model';

@Component({
  selector: 'app-card-blocked',
  templateUrl: './card-blocked.component.html',
  styleUrls: ['./card-blocked.component.scss']
})
export class CardBlockedComponent implements OnInit {
  @Input() blocked?: Blocked;

  constructor() { }

  ngOnInit(): void {
  }

}
