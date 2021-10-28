import { Component, Input, OnInit } from '@angular/core';
import { GroupService } from 'src/app/core/http/group.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { ConstantsService } from '../../constant/constants.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { GeneralService } from 'src/app/core/services/general.service';
import { MatDialog } from '@angular/material/dialog';
import { ClinicCardDetailComponent } from '../clinic-card-detail/clinic-card-detail.component';

@Component({
  selector: 'app-clinic-card',
  templateUrl: './clinic-card.component.html',
  styleUrls: ['./clinic-card.component.scss']
})
export class ClinicCardComponent implements OnInit {

  @Input() clinic?: IGroup;
  @Input() type?: String;
  @Input() session?: String;
  createTime: string = ''
  distance: string = ''
  mapStatus: any;
  user: any;

  isRemote: boolean = false
  typesMap!: Map<string, any>;
  constructor(private generalService: GeneralService,
    private groupService: GroupService,
    public dialog: MatDialog,
    private storageService: StorageService,
    public constantsService: ConstantsService,
    private notificationService: NotificationService) {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ClinicCardDetailComponent, {
      width: '250px',
      data: this.clinic
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
  mark($event: any, action?: string) {
    $event.stopPropagation();
    $event.preventDefault();
    if (!this.user) {
      this.notificationService.warn("Bạn cần phải đăng nhập để sử dụng chức năng này")
      return
    }
  }

  ngOnInit(): void {
    this.typesMap = this.constantsService.TYPE_CLINIC;
    this.user = this.storageService.userInfo;
    this.mapStatus = this.constantsService.REQUEST_STATUS;
    this.createTime = this.generalService.diffDate(new Date(this.clinic?.created_time!))
    const RLocation = this.clinic?.location?.split(',')
    const CLocation = this.storageService.location;
    this.distance = this.generalService.getDistanceFromLatLonInKm(parseFloat(RLocation![0]), parseFloat(RLocation![1]), CLocation.lat, CLocation.lng);
  }

}
