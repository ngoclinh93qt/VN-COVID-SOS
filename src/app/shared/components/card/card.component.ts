import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from 'src/app/pages/hospital/model/hospital.mode';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() hospital?: Hospital;

  constructor() { }

  ngOnInit(): void {
  }

}
