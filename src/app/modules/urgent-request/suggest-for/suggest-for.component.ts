import { Component, Input, OnInit } from '@angular/core';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { ConstantsService } from 'src/app/shared/constant/constants.service';

@Component({
  selector: 'suggest-for',
  templateUrl: './suggest-for.component.html',
  styleUrls: ['./suggest-for.component.scss']
})
export class SuggestForComponent implements OnInit {

  suggested: ISOSRequest[] = [];
  @Input() groups: any[] = [];
  numGroup: number = 0;
  @Input() user_id: string = '';
  session: string;
  constructor(private urgentRequestService: UrgentRequestService, private constant: ConstantsService) {
    this.session = this.constant.SESSION.SUGGESTED_REQUESTS
  }
  isSuggested = true;

  params: IQueryPrams[] = []
  paramsInit() {
    this.numGroup = this.groups?.length;
    for (var i = 0; i <= this.numGroup; i++) this.params.push({ limit: 10, offset: 0 })
  }
  updateParams(index: number, returnNumber: number) {
    if (returnNumber < 10) this.params[index].limit = 0; else
      this.params[index].offset! += 10;
  }

  ngOnInit(): void {
    this.paramsInit();
    this.load();
  }
  load() {
    this.groups.forEach((group: any, index) => {
      if (this.params[index].limit != 0)
        this.urgentRequestService.getGroupSuggested(group.id, this.params[index]).subscribe((result) => {
          this.suggested = [...this.suggested, ...result]
          this.updateParams(index, result.length);
          console.log(result);
        });
    });
    if (this.params[this.numGroup] != 0)
      this.urgentRequestService.getUserSuggested(this.params[this.numGroup]).subscribe(result => {
        this.suggested = [...this.suggested, ...result];
        this.updateParams(this.numGroup, result.length);
      })
  }
}
