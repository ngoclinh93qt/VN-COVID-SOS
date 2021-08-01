import { Component, OnInit } from '@angular/core';
import { BlockedService } from 'src/app/core/services/rest-services/blocked.service';

@Component({
  selector: 'app-blocked',
  templateUrl: './blocked.component.html',
  styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent implements OnInit {
  gridColumns = 3;
  blockeds =[];

  constructor(private blockedService: BlockedService,) {
    blockedService.findAll()
  }

  ngOnInit(): void {
  }

}
