import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from 'src/app/core/services/general.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-clinic-card-detail',
  templateUrl: './clinic-card-detail.component.html',
  styleUrls: ['./clinic-card-detail.component.scss']
})
export class ClinicCardDetailComponent implements OnInit {
  createTime: string = ''
  distance: string = ''
  
  constructor(private generalService: GeneralService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<ClinicCardDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public clinic: IGroup) {

  }
  ngOnInit(): void {
    this.createTime = this.generalService.diffDate(new Date(this.clinic?.created_time!))
    const RLocation = this.clinic?.location?.split(',')
    const CLocation = this.storageService.location;
    this.distance = this.generalService.getDistanceFromLatLonInKm(parseFloat(RLocation![0]), parseFloat(RLocation![1]), CLocation.lat, CLocation.lng);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
