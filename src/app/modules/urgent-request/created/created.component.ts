import { ConstantsService } from 'src/app/shared/constant/constants.service';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'created-request',
  templateUrl: './created.component.html',
  styleUrls: ['./created.component.scss']
})
export class CreatedComponent implements OnInit {
  userCreatedRequests: ISOSRequest[] = [];
  @Input() user_id: string = '';
  session: string;
  constructor(private urgentRequestService: UrgentRequestService, private constantsService: ConstantsService) {
    this.session = this.constantsService.SESSION.CREATED_REQUESTS
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
      this.urgentRequestService.getByRequesterId(this.user_id, this.params).subscribe((result) => {
        this.userCreatedRequests = [...this.userCreatedRequests, ...result];
        this.updateParams(result.length);
      });
  }
}
