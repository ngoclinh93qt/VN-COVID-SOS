import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  @Input() member?: IGroupMember;
  constructor() {}

  ngOnInit(): void {}
}
