import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/core/http/group.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { ConstantsService } from 'src/app/shared/constant/constants.service';
import { LocationService } from 'src/app/shared/subjects/location.service';

@Component({
  selector: 'all-clinic-container',
  templateUrl: './clinic-container.component.html',
  styleUrls: ['./clinic-container.component.scss']
})
export class ClinicContainerComponent implements OnInit, OnDestroy {

  @Input() clinics?: IGroup[];
  @Input() set locationPicked(latlg: google.maps.LatLng | undefined) {
    if (latlg) {
      this.setLocation({ lat: latlg.lat(), lng: latlg.lng() });
      this.search();
    }
  };
  @Output() clinicsChange = new EventEmitter<IGroup[]>();
  @Output() isMapPicked = new EventEmitter<boolean>();
  _isPicked = false;
  isLoading = false;
  session: string;
  statuses: IRequestStatus[] = [];
  distanceOpt: number[] = [1, 2, 5, 10, 20, 50, 100];
  LIMIT = 20;
  filterObject: IGroupSearchObject = {
    lat_position: 0,
    long_position: 0,
    distance: 10,
    keyword: '',
    verify_status: [],
    type: 'tram_y_te'
  };
  queryObject: any = {};
  subscription: Subscription | undefined
  subscriptionLocation: Subscription | undefined
  constructor(public dialog: MatDialog,
    private groupService: GroupService,
    private storageService: StorageService,
    private notification: NotificationService,
    private constantsService: ConstantsService,
    private locationService: LocationService,
  ) {
    this.statuses = this.constantsService.STATUS_LIST
    this.session = this.constantsService.SESSION.DEFAULT
    this.fetchInit();
  }

  params: IQueryPrams = {}
  paramsInit() {
    this.params = { limit: this.LIMIT, offset: 0 }
  }
  updateParams(returnNumber: number) {
    if (returnNumber < this.LIMIT) this.params.limit = 0; else
      this.params.offset! += this.LIMIT;
  }
  searchClick(data: any) {
    this.filterObject.keyword = data.value;
    this.search();
  }
  selectStatus(type: string, $event: any) {
    this.select($event);
    const index: number = this.filterObject.verify_status?.indexOf(type)!;

    if (index != -1 && index != undefined)
      this.filterObject.verify_status?.splice(index, 1);
    else this.filterObject.verify_status?.push(type);
    console.log(this.filterObject.verify_status!);
    this.search();
  }
  selectDistance(dis: number) {
    this.filterObject.distance = dis;
    this.search();
  }
  clearKey() {
    this.filterObject.keyword = ""
  }
  setKey($event: any) {
    console.log($event.target.value);
    this.filterObject.keyword = $event.target.value;
    this.search();
  }
  search(isReload?: boolean) {

    this.clinics = [];

    if (this.filterObject.verify_status?.find(e => e === 'verified')) {
      this.filterObject.verify_status = this.filterObject.verify_status.filter(e => e != 'verified')
      this.filterObject = { ...this.filterObject }
    }


    this.queryObject = {
      ...this.filterObject,
      verify_status: this.filterObject.verify_status?.toString(),

    };
    this.paramsInit();

    this.load(isReload);
  }
  load(isReload?: boolean) {
    if (this.params.limit != 0)
      this.groupService.search(this.queryObject, this.params).subscribe((result) => {
        if (this.params.offset != 0 && !isReload) this.clinics = [...this.clinics!, ...result.groups];
        else this.clinics = result.groups;
        this.clinicsChange.emit(this.clinics);
        console.log(this.params.offset)
        this.updateParams(result.total);
        console.log(this.clinics)
        console.log(result);

      });
  }
  select($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
    if ($event.target) {
      $event.target.classList.toggle('selected');
    }
  }
  fetchInit() {
  }
  setLocation(data: any) {
    this.filterObject.lat_position = data.lat?.toString();
    this.filterObject.long_position = data.lng?.toString();
  }
  ngOnInit(): void {
    console.log("INITTT")
    this.setLocation(this.storageService.location)
    this.search(true);
    // this.locationService.updateLocation();
    console.log(this.storageService.location)
    this.subscription = this.storageService.locationSubject.subscribe({
      next: (location: ILocation) => {
        console.log("location change")
        this.setLocation(location); console.log("location", location); this.search(true)
      }
    })
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionLocation?.unsubscribe();
  }

  selectLocation() {
    this._isPicked = !this._isPicked
    if (this._isPicked) {
      this.notification.info("Hãy kéo biểu tượng đánh dấu tới nơi bạn muốn tìm kiếm")
    }
    this.isMapPicked.emit(this._isPicked)
  }
}
