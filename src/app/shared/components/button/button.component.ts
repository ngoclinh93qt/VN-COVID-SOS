import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }
  @Input() color = '';
  @Input() icon = '';
  @Input() text = '';
  @Output() onClickEvent = new EventEmitter<string>();

  onClick(value: string) {
    this.onClickEvent.emit(value);
  }
  ngOnInit(): void {
  }

}
