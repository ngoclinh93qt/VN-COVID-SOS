import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { LoadingService } from '../../components/loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class S3Service {
  bucket: S3;
  data = { message: '', data: '' };

  constructor(private loading: LoadingService) {
    this.bucket = new S3({
      accessKeyId: environment.s3.AccessKeyId,
      secretAccessKey: environment.s3.Secret,
      region: 'us-west-2',
    });
  }

  // validateandUploadFile(file: File, Iheight: number, Iwidth: number) {

  //   let fileToUpload = file;
  //   if (fileToUpload.type == "image/jpeg" || fileToUpload.type == "image/png" || fileToUpload.type == "image/jpeg") {
  //     //Show image preview
  //     let reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       var img = new Image();
  //       img.onload = () => {
  //         let width = img.width;

  //         let height = img.height;
  //         if (width <= Iwidth && height <= Iheight) {
  //           this.imageUrl = event.target.result;

  //           this.uploadfile(file);
  //         } else {

  //           this.data.message = "You can maximum upload " + Iheight + " * " + Iwidth + " File";
  //           this.data.data = "";
  //           this.resData.next(this.data);
  //           return this.resData;
  //         }
  //       };

  //       img.src = event.target.result;
  //     }
  //     reader.readAsDataURL(fileToUpload);
  //   } else {
  //     this.data.message = "You can't be able to upload file except JPG and PNG format";
  //     this.data.data = "";
  //     this.resData.next(this.data);
  //     return this.resData;
  //   }
  // }

  uploadFile(file: File): Observable<any> {
    this.loading.start();
    return new Observable((subscription) => {
      const contentType = file.type;
      const params = {
        Bucket: '',
        Key: file.name,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read',
      };
      this.bucket.upload(params, (err: any, data: any) => {
        this.loading.stop();
        if (err) {
          console.log('There was an error uploading your file: ', err);
          subscription.error(err);
        }
        subscription.next(data);
        subscription.complete();
      });
    });
  }

  // uploadList(prefix: string): Observable<any> {
  //   this.loading.start();
  //   return new Observable(subscription => {
  //     var params = {
  //       Bucket: 'covidsos',
  //       Delimiter: '/',
  //       Prefix: prefix //Path storage
  //      }
  //     this.bucket.listObjects(params, (err: any, data: any) => {
  //       this.loading.stop();
  //       if (err) {
  //         console.log('There was an error uploading your file: ', err);
  //         subscription.error(err);
  //       }
  //       subscription.next(data);
  //       subscription.complete();
  //     })
  //   })
  // }

  // deleteFile(fileName: string) {

  //   var params = {
  //     Bucket: 'covidsos',
  //     Key: fileName
  //   };
  //   var that = this;
  //   this.bucket.deleteObject(params, function (err, data) {
  //     if (err) console.log(err, err.stack); // an error occurred
  //     else console.log(data)

  //   });
  // }
}
