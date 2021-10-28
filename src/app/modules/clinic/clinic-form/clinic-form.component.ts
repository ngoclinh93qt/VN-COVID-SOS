import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Loader } from '@googlemaps/js-api-loader';
import { Subscription } from 'rxjs';
import { GroupService } from 'src/app/core/http/group.service';
import { ProvinceService } from 'src/app/core/http/province.service';
import { SupportTypesService } from 'src/app/core/http/support-types.service';
import { UsersService } from 'src/app/core/http/users.service';
import { FormatService } from 'src/app/core/services/format.service';
import { S3Service } from 'src/app/core/services/s3.service';
import { StorageService } from 'src/app/core/services/storage.service';
import { NotificationService } from 'src/app/shared/components/notification/notification.service';
import { LocationService } from 'src/app/shared/subjects/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clinic-form',
  templateUrl: './clinic-form.component.html',
  styleUrls: ['./clinic-form.component.scss']
})
export class ClinicFormComponent implements OnInit, OnDestroy {
  clinicForm: FormGroup;
  location: string = '';
  supportTypes: ISupportType[] = [];
  provinces: IProvince[] = [];
  province: IProvince = {
    id: '',
  };
  onPickFile: boolean = false;
  district: IDistrict = { code: 0 };
  isShowmap = false;
  isMapCreated = false;
  imagesUploaded: string[] = [];
  medias: IMedias[] = [];
  user: any;
  name: string = ''
  subscription: Subscription | undefined
  markers: any;
  onClose(res?: IGroup): void {
    if (!this.onPickFile)
      this.dialogRef.close(res);
  }
  isSending = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: { action: String, clinic: IGroup, },

    private ProvinceService: ProvinceService,
    private SupportTypesService: SupportTypesService,

    public dialogRef: MatDialogRef<ClinicFormComponent>,
    private notificationService: NotificationService,
    private s3Service: S3Service,
    private locationService: LocationService,
    private userService: UsersService,
    public dialog: MatDialog,
    private storageService: StorageService,
    private formatService: FormatService,
    private groupService: GroupService) {
    this.clinicForm = new FormGroup({
      name: new FormControl("Trạm y tế"),
      type: new FormControl('tram_y_te'),
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
      detail_info: new FormGroup({
        support_types: new FormControl(''),
      })
    });
    this.fetchInit();

  }
  fetchInit() {
    this.ProvinceService.findAll().subscribe((result) => {
      this.provinces = result;
    });
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result.map(x => { return { name: x.name, type: x.type } });
    });
  }
  formInit() {
    if (this.data.action === 'update') {
      // this.province.id = this.data.request.address_info?.province_id!;
      // this.getProvince(this.province.id)
      // this.getDistrict(this.data.request.address_info?.district_code)
      // this.requestForm.patchValue({
      //   contact_info: this.data.request.contact_info,
      //   address_info: this.data.request.address_info,
      //   description: this.data.request.description,
      //   requester_object_status: this.data.request.requester_object_status,
      //   subject: this.data.request.subject,
      //   // support_types: this.data.request.support_types,
      // })
      // this.medias = this.data.request.medias!;
      // this.location = this.data.request.location!;
      // this.requestForm.value;
    } else
      if (this.user) {
        this.clinicForm.patchValue({
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
  onSubmit() {
    let clinic: IGroup = this.clinicForm.value;
    clinic.type = 'tram_y_te';
    clinic.avatar = this.medias && this.medias.length > 0? this.medias[0].url : '';
    clinic.location = this.location;
    console.log(clinic);
    this.groupService.create(clinic).subscribe(gr =>  this.dialogRef.close(gr))
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  ngOnInit(): void {
    if (this.data.action != 'update') {
      this.setLocation(this.storageService?.location);
      this.subscription = this.storageService.locationSubject.subscribe({ next: (location: ILocation) => { this.setLocation(location) } })
    }
    this.user = this.storageService.userInfo;
    this.formInit();
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
        libraries: ['places']
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
        const input = document.getElementById("pac-input") as HTMLInputElement;

        const searchBox = new google.maps.places.SearchBox(input);
        map.addListener("bounds_changed", () => {
          searchBox.setBounds(map?.getBounds() as google.maps.LatLngBounds);
        });
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();

          if (places?.length == 0) {
            return;
          }

          // Clear out the old markers.
          this.markers = [];
          this.markers?.forEach((marker: any) => {
            marker.setMap(null);
          });


          // For each place, get the icon, name and location.
          const bounds = new google.maps.LatLngBounds();

          places?.forEach((place, index) => {
            if (!place.geometry || !place.geometry.location) {
              console.log("Returned place contains no geometry");
              return;
            }

            const icon = {
              url: place.icon as string,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25),
            };

            // Create a marker for each place.
            // this.markers.push(
            //   new google.maps.Marker({
            //     map,
            //     icon,
            //     title: place.name,
            //     position: place.geometry.location,
            //   })
            // );
            console.log("index", index);

            if (index == 0) {
              marker.setMap(null); marker = new google.maps.Marker({
                map,
                title: place.name,
                position: place.geometry.location,

                draggable: true,
              })
            }
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map?.fitBounds(bounds);
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
