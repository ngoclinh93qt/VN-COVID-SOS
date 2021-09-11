import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { LoadingService } from '../../shared/components/loading/loading.service';
import { RestService } from '../http/rest.service';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class S3Service extends RestService<IpresignedUrl> {
  data = { message: '', data: '' };

  constructor(http: HttpClient,private loading: LoadingService) {
    super(http, '');
  }

  uploadImage(file: File): Observable<string>{
    return this.getPresignerdUrl('sos_bucket').pipe(
      switchMap(res => this.uploadS3WithSigned(res, file).pipe(
        map(_ => res.split('?')[0])
      ))
    )
  }

  getPresignerdUrl(path: string): Observable<string>{
    return this.http.get(`${this.host}/s3/presigned?path=${path}&file_name=${Date.now()}`).pipe(map((response: any) => response.data.url))
  }

  uploadS3WithSigned(url: string, file: File): Observable<any>{
    return this.http.put(url, file)
  }
  

}
