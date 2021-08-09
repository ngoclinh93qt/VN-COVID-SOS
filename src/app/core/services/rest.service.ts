import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class RestService<T> implements IRestServices<T> {
  public model: T | undefined;
  public host: string;

  constructor(public http: HttpClient, @Inject(String) public pathName: string) { 
    this.host = environment.host;
  }
  findAll(): Observable<T[]> {
     return this.http.get<T[]>(`${this.host}/${this.pathName}`)
  }
  findOne(id: string): Observable<T> {
    return this.http.get<T>(`${this.host}/${this.pathName}/${id}`)
  }
  findLimitOffset(queryParams: IQueryPrams, extendOptions?: any): Observable<T[]> {
    extendOptions = extendOptions?extendOptions: {};
    return this.http.get<T[]>(`${this.host}/${this.pathName}`, { params: {...queryParams, ...extendOptions}})
  }
  findByOptions(queryParams: IQueryPrams, extendOptions?: any): Observable<T[]> {
    extendOptions = extendOptions?extendOptions: {};
    return this.http.get<T[]>(`${this.host}/${this.pathName}`, { params: {...queryParams, ...extendOptions}})
  }

  create(body: any, options: any):Observable<T>{
    return this.http.put<T>(`${this.host}/${this.pathName}`, body)
  }

  update(id : string, body: any, options: any):Observable<T>{
    return this.http.post<T>(`${this.host}/${this.pathName}/${id}`, body)
  }

  delete(id: string):Observable<any>{
    return this.http.delete<T>(`${this.host}/${id}`);
  }


}


interface IRestServices<T>{
 findAll(): Observable<T[]>;
 findOne(id: string): Observable<T>;
 findLimitOffset(queryParams: IQueryPrams, extendOptions?: any): Observable<T[]>;
 findByOptions(qqueryParams: IQueryPrams, extendOptions?: any):Observable<T[]>;

 create(body: any, options: any):Observable<T>;
 update(id: string, body: any, options: any):Observable<T>;
 delete(id: string): Observable<any>;

}