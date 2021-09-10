import { StorageService } from 'src/app/core/services/storage.service';
import { UrgentLevelService } from '../../../core/http/urgent-level.service';
import { NgForm } from '@angular/forms';
import { EMPTY } from 'rxjs';
import { RequesterObjectStatusService } from '../../../core/http/requester-object-status.service';
import { UrgentRequestService } from '../../../core/http/urgent-request.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SupportTypesService } from '../../../core/http/support-types.service';
import { ProvinceService } from '../../../core/http/province.service';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges,
  Inject,
} from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from 'src/environments/environment';
import { S3Service } from 'src/app/core/services/s3.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
})
export class RequestFormComponent implements OnInit {
  location: string = '';
  provinces: IProvince[] = [];
  province: IProvince = {
    id: '',
  };
  district: IDistrict = { code: 0 };
  supportTypes: ISupportType[] = [];
  requesterObjectStatus: IRequesterObjectStatus[] = [];
  urgentLevels: IPriorityType[] = [];
  isShowmap = false;
  isMapCreated = false;
  imagesUploaded: string[] = [];
  medias: IMedias[] = []
  onClose(): void {
    this.dialogRef.close();
    console.log('closeForm');
  }
  constructor(
    private RequesterObjectStatusService: RequesterObjectStatusService,
    private StorageService: StorageService,
    private ProvinceService: ProvinceService,
    private SupportTypesService: SupportTypesService,
    private UrgentRequestService: UrgentRequestService,
    public dialogRef: MatDialogRef<RequestFormComponent>,
    private UrgentLevelService: UrgentLevelService,
    private s3Service: S3Service,
  ) {
    this.urgentLevels = UrgentLevelService.getUrgentLevels();
    this.fetchInit();
  }

  fetchInit() {
    this.ProvinceService.findAll().subscribe((result) => {
      this.provinces = result;
    });
    this.SupportTypesService.findAll().subscribe((result) => {
      this.supportTypes = result;
    });
    this.RequesterObjectStatusService.findAll().subscribe((result) => {
      this.requesterObjectStatus = result;
    });
  }
  async onSubmit(data: ISOSRequest) {
    data.requester_type = 'guest';
    data.medias = this.medias;
    data.requester_type = '';
    data.medias = [];
    const user = this.StorageService.userInfo;
    if (user!== null && user.role !== 'GUEST') {
      data.requester_type = 'user';
      data.requester_id = user.id;
    }
    data.location = this.location;
    if (!data.support_types) data.support_types = [];
    if (!data.requester_object_status) data.requester_object_status = [];
    console.log(data);
    this.UrgentRequestService.create(data, {}).subscribe();
  }
  checkSubmit(data: any) {
    if (data.status == 'VALID') this.onClose();
  }
  getProvince(id: string) {
    this.ProvinceService.findOne(id).subscribe((result) => {
      this.province = result;
    });
  }
  getDistrict(id?: number) {
    this.ProvinceService.getDistrict(this.province.id, id).subscribe(
      (result) => {
        this.district = result;
      }
    );
  }
  setLocation(l: string) {
    this.location = l;
  }

  ngOnInit() {
    var l: string = '';
    let data = this.StorageService.setLocation();
    this.setLocation(`${data.lat},${data.lng}`);
  }

  uploadImage(){

    

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
          center: this.StorageService.getLocation(),
          zoom: 15,
          styles: environment.mapStyle,
        });
        var marker = new google.maps.Marker({
          position: this.StorageService.getLocation(),
          map: map,
          draggable: true //make it draggable
        });

        const infoWindow = new google.maps.InfoWindow();
        google.maps.event.addListener(map, 'click', function (event: { latLng: any; }) {
          var clickedLocation = event.latLng;
          if (!marker) {
            marker = new google.maps.Marker({
              position: clickedLocation,
              map: map,
              draggable: true //make it draggable
            });
          }
        })

        var self = this;

        google.maps.event.addListener(marker, 'dragend', ()=>{
          self.setLocation(`${marker.getPosition()?.lat()}, ${marker.getPosition()?.lng()}`);
        });
     
      });
    }
  }
  onFilePicked(event: any){
    console.log(event.target.files[0])
    let file = event.target.files[0]
    this.s3Service.uploadImage(file).subscribe(res => {
      this.medias = [...this.medias, {
        mime_type: this.getFileType(file),
        url: res
      }]
    })
  }

  getFileType(file: File): string {

    if(file.type.match('image.*'))
      return 'image';
  
    if(file.type.match('video.*'))
      return 'video';
  
    if(file.type.match('audio.*'))
      return 'audio';
  
    return 'other';
  }

  deleteImg(order: number){
    this.medias.splice(order,1)
  }

}
