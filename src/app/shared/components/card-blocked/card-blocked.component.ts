import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Blocked } from 'src/app/modules/blocked/model/blocked.model';
import { CardComponent } from '..';

@Component({
  selector: 'app-card-blocked',
  templateUrl: './card-blocked.component.html',
  styleUrls: ['./card-blocked.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CardBlockedComponent),
      multi: true,
    },
  ],
})
export class CardBlockedComponent implements OnInit {
  @Input() blocked?: Blocked;

  constructor() {}

  ngOnInit(): void {}
}
