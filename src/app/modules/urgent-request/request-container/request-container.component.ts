import { Subscription } from 'rxjs';
import { LocationService } from './../../../shared/subjects/location.service';
import { UrgentRequestService } from 'src/app/core/http/urgent-request.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { RequesterObjectStatusService } from '../../../core/http/requester-object-status.service';
import { RequestStatusService } from '../../../core/http/request-status.service';
import { SupportTypesService } from '../../../core/http/support-types.service';
import { UrgentLevelService } from '../../../core/http/urgent-level.service';

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RequestFormComponent } from '../request-form/request-form.component';
import { ConstantsService } from 'src/app/shared/constant/constants.service';

@Component({
  selector: 'all-request-container',
  templateUrl: './request-container.component.html',
  styleUrls: ['./request-container.component.scss'],
})
export class RequestContainerComponent implements OnInit, OnDestroy {
  @Input() requests?: ISOSRequest[];
  @Output() requestsChange = new EventEmitter<ISOSRequest[]>();
  session: string;
  statuses: IRequestStatus[] = [];
  supportTypes: ISupportType[] = [];
  requesterObjectStatus: IRequesterObjectStatus[] = [];
  distanceOpt: number[] = [1, 2, 5, 10, 20, 50, 100];
  filterObject: IRequestFilter = {
    lat_position: 0,
    long_position: 0,
    distance: 10,
    priority_type: [],
    keyword: '',
    object_status: [],
    status: [],
    support_types: [],
  };
  queryObject: any = {};
  subscription: Subscription | undefined
  subscriptionLocation: Subscription | undefined
  constructor(public dialog: MatDialog,
    private UrgentRequestService: UrgentRequestService,
    private StorageService: StorageService,
    private SupportTypesService: SupportTypesService,
    private RequesterObjectStatusService: RequesterObjectStatusService,
    private LocationService: LocationService,
    private constantsService: ConstantsService,
  ) {
    this.statuses = this.constantsService.STATUS_LIST
    this.session = this.constantsService.SESSION.DEFAULT
    this.fetchInit();
  }

  params: IQueryPrams = {}
  paramsInit() {
    this.params = { limit: 20, offset: 0 }
  }
  updateParams(returnNumber: number) {
    if (returnNumber < 20) this.params.limit = 0; else
      this.params.offset! += 20;
  }
  selectPriority(type: string, $event: any) {
    this.select($event);
    const index: number = this.filterObject.priority_type?.indexOf(type)!;

    if (index != -1 && index != undefined)
      this.filterObject.priority_type?.splice(index, 1);
    else this.filterObject.priority_type?.push(type);
    console.log(this.filterObject.priority_type!);
    this.search();
  }
  searchClick(data: any) {
    this.filterObject.keyword = data.value;
    this.search();
  }
  selectSupportType(type: string, $event: any) {
    this.select($event);
    const index: number = this.filterObject.support_types?.indexOf(type)!;

    if (index != -1 && index != undefined)
      this.filterObject.support_types?.splice(index, 1);
    else this.filterObject.support_types?.push(type);
    console.log(this.filterObject.support_types!);
    this.search();
  }
  selectStatus(type: string, $event: any) {
    this.select($event);
    const index: number = this.filterObject.status?.indexOf(type)!;

    if (index != -1 && index != undefined)
      this.filterObject.status?.splice(index, 1);
    else this.filterObject.status?.push(type);
    console.log(this.filterObject.status!);
    this.search();
  }
  selectObject(type: string, $event: any) {
    this.select($event);
    const index: number = this.filterObject.object_status?.indexOf(type)!;

    if (index != -1 && index != undefined)
      this.filterObject.object_status?.splice(index, 1);
    else this.filterObject.object_status?.push(type);
    console.log(this.filterObject.object_status!);
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
  search() {
    console.log("search");

    this.requests = [];
    this.queryObject = {
      ...this.filterObject,
      status: this.filterObject.status?.toString(),
      object_status: this.filterObject.object_status?.toString(),
      support_types: this.filterObject.support_types?.toString(),
      priority_type: this.filterObject.priority_type?.toString(),
    };
    this.paramsInit();
    console.log(this.params.offset)
    this.load();
  }
  load() {
    console.log("load");
    console.log(this.params.offset)
    if (this.params.limit != 0)
      this.UrgentRequestService.search(this.queryObject, this.params).subscribe((result) => {
        if (this.params.offset != 0) this.requests = [...this.requests!, ...result.sos_requests];
        else this.requests = result.sos_requests;
        this.requestsChange.emit(this.requests);
        console.log(this.params.offset)
        this.updateParams(result.total);
        console.log(this.requests)
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
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result;
    });
    this.RequesterObjectStatusService.findAll().subscribe((result) => {
      this.requesterObjectStatus = result;
    });
  }

  openCreateForm(): void {
    const dialogRef = this.dialog.open(RequestFormComponent, {
      width: 'auto',
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return
      }
      this.requests = this.requests ? [result, ...this.requests] : [result]
    });
  }
  setLocation(data: any) {
    this.filterObject.lat_position = data.lat?.toString();
    this.filterObject.long_position = data.lng?.toString();
  }
  ngOnInit(): void {
    console.log("INITTT")
    this.setLocation(this.StorageService.location);

    this.subscription = this.StorageService.locationSubject.subscribe({
      next: (location: ILocation) => { this.setLocation(location); console.log("location", location); this.search() } //detect current location change
    })
   
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.subscriptionLocation?.unsubscribe();
  }
}
