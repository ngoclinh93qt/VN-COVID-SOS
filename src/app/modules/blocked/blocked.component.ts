import { Component, OnInit } from '@angular/core';
import { BlockedService } from 'src/app/core/http/blocked.service';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss'],
})
export class BlockedComponent implements OnInit {
  gridColumns = 3;
  blockeds: IBlocked[] = [];

  constructor(private blockedService: BlockedService) {
    blockedService.findAll();
    this.blockeds = blockedService.blockeds;
  }

  ngOnInit(): void {}
}
