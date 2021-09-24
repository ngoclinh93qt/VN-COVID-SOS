import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { Component, Input, OnInit } from '@angular/core';
import { ConstantsService } from 'src/app/shared/constant/constants.service';

@Component({
  selector: 'joined-request',
  templateUrl: './joined.component.html',
  styleUrls: ['./joined.component.scss']
})
export class JoinedComponent implements OnInit {
  joinedRequests: ISOSRequest[] = [];
  @Input() user_id: string = '';
  session: string;
  constructor(private UrgentRequestService: UrgentRequestService, private constant: ConstantsService) {
    this.session = this.constant.SESSION.JOINED_REQUESTS
  }

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
      this.UrgentRequestService.getJoinedRequests(this.user_id, this.params).subscribe((result) => {
        this.joinedRequests = [...this.joinedRequests, ...result];
        this.updateParams(result.length);
      });
  }
}
