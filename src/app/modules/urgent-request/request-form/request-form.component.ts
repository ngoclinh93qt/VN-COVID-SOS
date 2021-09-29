import { LocationService } from './../../../shared/subjects/location.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { Subscription } from 'rxjs';
import { RequesterObjectStatusService } from '../../../core/http/requester-object-status.service';
import { UrgentRequestService } from '../../../core/http/urgent-request.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupportTypesService } from '../../../core/http/support-types.service';
import { ProvinceService } from '../../../core/http/province.service';
import {
  Component,
  OnInit,
  Inject
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
  requestForm: FormGroup;

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
    @Inject(MAT_DIALOG_DATA) public data: { action: String, request: ISOSRequest },
    private RequesterObjectStatusService: RequesterObjectStatusService,
    private ProvinceService: ProvinceService,
    private SupportTypesService: SupportTypesService,
    private UrgentRequestService: UrgentRequestService,
    public dialogRef: MatDialogRef<RequestFormComponent>,
    private notificationService: NotificationService,
    private s3Service: S3Service,
    private locationService: LocationService,
    private userService: UsersService,
    public dialog: MatDialog,
    private storageService: StorageService,
    private formatService: FormatService,
  ) {
    this.requestForm = new FormGroup({
      type: new FormControl('ask'),
      contact_info: new FormGroup({
        name: new FormControl(''),
        phone_number: new FormControl('')
      }),
      address_info: new FormGroup({
        district_code: new FormControl(''),
        province_id: new FormControl(''),
        address: new FormControl(''),
        ward_code: new FormControl(''),
      }),
      description: new FormControl(''),
      requester_object_status: new FormControl(''),
      subject: new FormControl(''),
      support_types: new FormControl(''),
      share_phone_number: new FormControl('private'),
    });
    console.log(data.request)

    this.fetchInit();
    console.log("formConstruct");
  }

  show(data: any) {
    console.log(data)
  }
  formInit() {
    if (this.data.action === 'update') {
      this.province.id = this.data.request.address_info?.province_id!;
      this.getProvince(this.province.id)
      this.getDistrict(this.data.request.address_info?.district_code)
      this.requestForm.patchValue({
        contact_info: this.data.request.contact_info,
        address_info: this.data.request.address_info,
        description: this.data.request.description,
        requester_object_status: this.data.request.requester_object_status,
        subject: this.data.request.subject,
        // support_types: this.data.request.support_types,
      })
      this.medias = this.data.request.medias!;
      this.location = this.data.request.location!;
      this.requestForm.value;
    } else
      if (this.user) {
        this.requestForm.patchValue({
          contact_info: {
            name: this.user.last_name + ' ' + this.user.first_name,
            phone_number: this.user.phone_number
          },
          address_info: {
            address: this.user.address
          }
        })
      }
  }

  ngOnInit() {
    if (this.data.action != 'update') {
      this.setLocation(this.storageService?.location);
      this.subscription = this.storageService.locationSubject.subscribe({ next: (location: ILocation) => { this.setLocation(location) } })
    }
    this.user = this.storageService.userInfo;
    this.formInit();
    console.log(this.requestForm.value)
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
      // let temp: ISupportType[] = [];
      // if (this.data.action == 'update') {
      //   this.supportTypes.forEach(x => {
      //     this.data.request.support_types?.forEach(xx => {
      //       if (x.type == xx.type) temp.push(x);
      //     })
      //   })
      //   this.requestForm.patchValue({ support_types: temp })
      // }



    });
    this.RequesterObjectStatusService.findAll().subscribe((result) => {
      this.requesterObjectStatus = result.map(x => { return { name: x.name, type: x.key } });
      let temp: IRequesterObjectStatus[] = []
      if (this.data.action == 'update') {
        this.requesterObjectStatus.forEach(x => {
          this.data.request.requester_object_status?.forEach(xx => {
            if (x.type == xx.type) temp.push(x);
          })
        })
        this.requestForm.patchValue({ requester_object_status: temp })
      }


    });
  }
  onSubmit() {
    let request: ISOSRequest = this.requestForm.value;
    request.requester_type = 'guest';
    request.medias = this.medias;
    request.share_phone_number = 'public'

    if (this.user != null && this.user?.role !== 'GUEST') {
      request.requester_type = 'user';
      request.requester_id = this.user.id;
    }
    request.location = this.location;
    if (this.data.action === 'update') return this.UrgentRequestService.update(this.data.request.id!, request, {}).subscribe(res => {
      this.notificationService.success("Cập nhật thành công")
      this.onClose(res)
      this.checkProfile(res)
    });
    this.UrgentRequestService.create(request, {}).subscribe(res => {
      this.notificationService.success("Yêu cầu của bạn đã được tạo thành công")
      this.onClose(res)
      this.checkProfile(res)
    });
    return;
  }

  checkProfile(data: ISOSRequest) {
    if (this.storageService.userInfo) {
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
            maxWidth: '585px ',
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

  getProvince(id: string) {
    this.ProvinceService.findOne(id).subscribe((result) => {
      this.province = result;
      this.formatService.format(this.province.districts)

    });
  }
  getDistrict(id?: number) {
    console.log(this.province)
    this.ProvinceService.getDistrict(this.province.id, id).subscribe(
      (result) => {
        this.district = result;
        this.formatService.format(this.district.wards);
      }
    );
  }
  setLocation(location: ILocation) {
    if (!location) {
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
          return self.setLocation({ lat: location?.lat() || 0, lng: location?.lng() || 0 });
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
