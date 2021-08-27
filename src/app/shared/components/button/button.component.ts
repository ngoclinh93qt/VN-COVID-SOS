import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  constructor() {}
  @Input() color = 'basic';
  @Input() icon = '';
  @Input() text = '';
  @Input() height = '';
  @Input() type = 'raised';
  style = '';
  @Output() onClickEvent = new EventEmitter<string>();

  onClick(value: string) {
    this.onClickEvent.emit(value);
  }
  ngOnInit(): void {
    this.style = 'height:' + (this.height != '' ? this.height : '20') + 'px';
    this.style =
      this.style + ' ; font-size:' + (this.height != '32' ? '16' : '11') + 'px';
  }
}
