import { LocationService } from './../../../shared/subjects/location.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { UrgentLevelService } from '../../../core/http/urgent-level.service';
import { NgForm } from '@angular/forms';
import { EMPTY, Subscription } from 'rxjs';
import { RequesterObjectStatusService } from '../../../core/http/requester-object-status.service';
import { UrgentRequestService } from '../../../core/http/urgent-request.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupportTypesService } from '../../../core/http/support-types.service';
import { ProvinceService } from '../../../core/http/province.service';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Inject,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { S3Service } from 'src/app/core/services/s3.service';
import { FormatService } from 'src/app/core/services/format.service';

import { FormGroup, FormControl } from '@angular/forms';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { UsersService } from 'src/app/core/http/users.service';
import { Router } from '@angular/router';
import { LoginFrameComponent } from 'src/app/shared/components/login-frame/login-frame.component';
import { UserSignupComponent } from '../../user-signup/user-signup.component';
@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  public formProfile: FormGroup = new FormGroup({
    name: new FormControl(''),
    phone_number: new FormControl(''),
    address: new FormControl(''),
  });
  location: string = '';
  provinces: IProvince[] = [];
  province: IProvince = {
    id: '',
  };
  onPickFile: boolean = false;
  district: IDistrict = { code: 0 };
  supportTypes: ISupportType[] = [];
  requesterObjectStatus: IRequesterObjectStatus[] = [];
  urgentLevels: IPriorityType[] = [];
  isShowmap = false;
  isMapCreated = false;
  imagesUploaded: string[] = [];
  medias: IMedias[] = [];
  user: any;
  name: string = ''
  subscription: Subscription | undefined
  onClose(res?: ISOSRequest): void {
    if (!this.onPickFile)
      this.dialogRef.close(res);
  }
  isSending = false;

  constructor(
    private RequesterObjectStatusService: RequesterObjectStatusService,
    private ProvinceService: ProvinceService,
    private SupportTypesService: SupportTypesService,
    private UrgentRequestService: UrgentRequestService,
    public dialogRef: MatDialogRef<RequestFormComponent>,
    private urgentLevelService: UrgentLevelService,
    private notificationService: NotificationService,
    private s3Service: S3Service,
    private locationService: LocationService,
    private userService: UsersService,
    private router: Router,
    public dialog: MatDialog,
    private storageService: StorageService,
    private formatService: FormatService,
  ) {
    this.urgentLevels = urgentLevelService.getUrgentLevels();
    this.fetchInit();
    console.log("formConstruct");
  }



  ngOnInit() {

    this.setLocation(this.storageService?.location);
    this.subscription = this.locationService.locationSubject.subscribe({ next: (location: ILocation) => { this.setLocation(location) } })
    this.user = this.storageService.userInfo;
    if (this.user) {
      this.formProfile.value.name = this.user.last_name + ' ' + this.user.first_name
      this.formProfile.value.phone_number = this.user.phone_number
      this.formProfile.value.address = this.user.address
      console.log(this.formProfile.value);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  fetchInit() {
    this.ProvinceService.findAll().subscribe((result) => {
      this.provinces = result;
    });
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result.map(x => { return { name: x.name, type: x.type } });
      console.log(this.supportTypes);
    });
    this.RequesterObjectStatusService.findAll().subscribe((result) => {
      this.requesterObjectStatus = result.map(x => { return { name: x.name, type: x.key } });
      console.log(this.requesterObjectStatus);
    });
  }
  onSubmit(data: ISOSRequest) {
    data.requester_type = 'guest';
    data.medias = this.medias;
    const user = this.storageService.userInfo;
    if (user != null && user?.role !== 'GUEST') {
      data.requester_type = 'user';
      data.requester_id = user.id;
    }
    data.location = this.location;
    if (!data.support_types) data.support_types = [];
    if (!data.requester_object_status) data.requester_object_status = [];
    this.UrgentRequestService.create(data, {}).subscribe(res => {
      this.notificationService.success("Yêu cầu của bạn đã được tạo thành công")
      this.onClose(res)
      this.checkProfile(data)
    });
    
  }

  checkProfile(data: ISOSRequest){
    if(this.storageService.userInfo){
      return
    }
    this.userService.searchProfile({ phone_number: data.contact_info?.phone_number }).subscribe(res => {
      if (res.is_existed) {
        this.notificationService.warn("Hãy đăng nhập để theo dõi yêu cầu của bạn")
        this.notificationService.error("Đã hết hạn đăng nhập")
        localStorage.clear();
        this.dialog.open(LoginFrameComponent,
          {
            panelClass: 'login-frame-dialog',
            width: '100%',
            maxWidth: '585px',
            data: data.contact_info?.phone_number
          })
      } else {
        this.notificationService.warn("Hãy ký nhập để theo dõi yêu cầu của bạn");

        const dialogRef = this.dialog.open(UserSignupComponent, {
          panelClass: 'dialog-responsive',
          data: data.contact_info?.phone_number
        });
        dialogRef.afterClosed().subscribe(result => {

        });

      }
    })
  }

  checkSubmit(data: any, isAccepted: any) {
     (isAccepted._checked && data.status == 'VALID' && !this.onPickFile) ? this.onSubmit(data.value) : this.notificationService.error("Bạn cần điền đầy đủ thông tin")
  }
  getProvince(id: string) {
    this.ProvinceService.findOne(id).subscribe((result) => {
      this.province = result;
      this.formatService.format(this.province.districts)
    });
  }
  getDistrict(id?: number) {
    this.ProvinceService.getDistrict(this.province.id, id).subscribe(
      (result) => {
        this.district = result;
        this.formatService.format(this.district.wards);
      }
    );
  }
  setLocation(location: ILocation) {
    if(!location){
      return
    }
    this.location = `${location.lat},${location.lng}`;
  }

  pickLocation() {
    this.isShowmap = !this.isShowmap;
    if (this.isShowmap && !this.isMapCreated) {
      this.isMapCreated = true;
      const loader = new Loader({
        apiKey: environment.googleApiKey,
      });

      loader.load().then(() => {

        const map = new google.maps.Map(document.getElementById('mapx') as HTMLElement, {
          center: this.storageService.location,
          zoom: 15,
          styles: environment.mapStyle,
        });
        var marker = new google.maps.Marker({
          position: this.storageService.location,
          map: map,
          draggable: true, //make it draggable
        });

        const infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(
          map,
          'click',
          function (event: { latLng: any }) {
            var clickedLocation = event.latLng;
            if (!marker) {
              marker = new google.maps.Marker({
                position: clickedLocation,
                map: map,
                draggable: true, //make it draggable
              });
            }
          }
        );

        var self = this;

        google.maps.event.addListener(marker, 'dragend', () => {
          const location = marker.getPosition()
          return self.setLocation({lat: location?.lat() || 0, lng: location?.lng() || 0});
        });

      });
    }
  }
  onFilePicked(event: any) {
    this.onPickFile = true;
    let file = event.target.files[0]
    this.isSending = true;
    this.s3Service.uploadImage(file).subscribe(res => {
      this.isSending = false;
      this.medias = [...this.medias, {
        mime_type: this.getFileType(file),
        url: res
      }]
      this.onPickFile = false;
    })
  }

  getFileType(file: File): string {
    if (file.type.match('image.*'))
      return 'image';

    if (file.type.match('video.*'))
      return 'video';

    if (file.type.match('audio.*'))
      return 'audio';

    return 'other';
  }

  deleteImg(order: number) {
    this.medias.splice(order, 1)
  }
}
