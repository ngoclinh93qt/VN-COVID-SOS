import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { UrgentRequestComponent } from './../urgent-request.component';


import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bookmarked-request',
  templateUrl: './bookmarked.component.html',
  styleUrls: ['./bookmarked.component.scss']
})
export class BookmarkedComponent implements OnInit {

  userMarkedRequests: ISOSRequest[] = [];
  constructor(private UrgentRequestService: UrgentRequestService) { }
  params: IQueryPrams = {}
  paramsInit() {
    this.params = { limit: 20, offset: 0 }
  }
  updateParams(returnNumber: number) {
    if (returnNumber < 20) this.params.limit = 0; else
      this.params.offset! += 20;
  }

  ngOnInit(): void {
    this.paramsInit();
    this.load();
  }
  load() {
    if (this.params.limit != 0)
      this.UrgentRequestService.getUserBookmarks(this.params).subscribe((result) => {
        this.userMarkedRequests = [...this.userMarkedRequests, ...result];
        this.updateParams(result.length);
      });
  }
}
