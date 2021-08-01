import { Component, OnInit } from '@angular/core';
import { BlockedService } from 'src/app/shared/services/rest-services/blocked.service';
import { Blocked } from './model/blocked.model';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {
  gridColumns = 3;
  blockeds: Blocked[] = [];

  constructor(private blockedService: BlockedService,) {
    this.blockeds = blockedService.fetechBlockedList()
  }

  ngOnInit(): void {
  }

}
