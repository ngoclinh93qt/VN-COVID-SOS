import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ConstantsService } from '../../constant/constants.service';

@Component({
  selector: 'app-support-card',
  templateUrl: './support-card.component.html',
  styleUrls: ['./support-card.component.scss'],
})
export class SupportCardComponent implements OnInit {
  @Input() supporter?: any;
  @Input() requestId?: string;
  isMe: boolean = false;

  mapSupportStatus!: Map<string, IBaseStatus>;


  @ViewChild('menuSupportTrigger') menuTrigger: MatMenuTrigger | undefined;
  constructor(private storageService: StorageService, 
    private constantsService: ConstantsService,
    private urgentRequestService: UrgentRequestService,) {
    // if(StorageService.userInfo.id === this.supporter.id){
    //   this.isMe = true;
    // }
  }

  ngOnInit(): void {
    this.mapSupportStatus = this.constantsService.SUPPORT_STATUS;
  }

  getStatusView(map: Map<string, IBaseStatus>): string{
    return map.get(this.supporter?.status || '')?.status_view || ''
  }

  getStatusSteps(map: Map<string, IBaseStatus>): string[]{
    return map.get(this.supporter?.status || '')?.next_step || []
  }

  getStatusString(map: Map<string, IBaseStatus>): string {
    return map.get(this.supporter?.status || '')?.status || ''
  }

  updateSupportStatus(item: string){
    const status = this.mapSupportStatus.get(item)?.status || ''
    this.supporter.support_status = status;
    this.urgentRequestService.updateSupporterStatus(
      this.requestId || '',
     {
       supporter_id: this.supporter.id,
       support_status: status,
       type: this.supporter.type
     }
    ).subscribe(result => {
      this.supporter = result.supporters?.find((element: any) => this.supporter.id === element?.id) || {}
    });
  }
}
