import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-support-card',
  templateUrl: './support-card.component.html',
  styleUrls: ['./support-card.component.scss'],
})
export class SupportCardComponent implements OnInit {
  @Input() supporter?: any;
  isMe: boolean = false;

  constructor(private StorageService: StorageService) {
    // if(StorageService.userInfo.id === this.supporter.id){
    //   this.isMe = true;
    // }
  }

  ngOnInit(): void {}
}
