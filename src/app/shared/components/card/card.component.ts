import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Hospital } from 'src/app/modules/hospital/model/hospital.mode';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() hospital?: Hospital;

  constructor() {}

  ngOnInit(): void {}
}
