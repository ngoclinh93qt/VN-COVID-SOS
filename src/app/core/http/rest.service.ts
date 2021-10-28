import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class RestService<T> implements IRestServices<T> {
  public model: T | undefined;
  public host: string;

  constructor(
    public http: HttpClient,
    @Inject(String) public pathName: string
  ) {
    this.host = environment.host;
  }
  findAll(): Observable<T[]> {
    return this.http
      .get<{ data: T[] }>(`${this.host}/${this.pathName}`)
      .pipe(map((res) => res.data));
  }
  findOne(id: string): Observable<T> {
    return this.http
      .get<{ data: T }>(`${this.host}/${this.pathName}/${id}`)
      .pipe(map((res) => res.data));
  }
  findLimitOffset(
    queryParams: IQueryPrams,
    extendOptions?: any
  ): Observable<T[]> {
    extendOptions = extendOptions ? extendOptions : {};
    return this.http
      .get<{ data: T[] }>(`${this.host}/${this.pathName}`, {
        params: { ...queryParams, ...extendOptions },
        
      })
      .pipe(map((res) => res.data));
  }
  findByOptions(
    queryParams: IQueryPrams,
    extendOptions?: any
  ): Observable<T[]> {
    extendOptions = extendOptions ? extendOptions : {};
    return this.http
      .get<{ data: T[] }>(`${this.host}/${this.pathName}`, {
        params: { ...queryParams, ...extendOptions },
      })
      .pipe(map((res) => res.data));
  }

  create(body: any, options?: any): Observable<T> {
    return this.http
      .put<{ data: T }>(`${this.host}/${this.pathName}`, body)
      .pipe(map((res) => res.data));
  }

  update(id: string, body: any, options: any): Observable<T> {
    return this.http
      .post<{ data: T }>(`${this.host}/${this.pathName}/${id}`, body)
      .pipe(map((res) => res.data));
  }

  delete(id: string): Observable<any> {
    return this.http.delete<T>(`${this.host}/${id}`);
  }
}

interface IRestServices<T> {
  findAll(): Observable<T[]>;
  findOne(id: string): Observable<T>;
  findLimitOffset(
    queryParams: IQueryPrams,
    extendOptions?: any
  ): Observable<T[]>;
  findByOptions(
    qqueryParams: IQueryPrams,
    extendOptions?: any
  ): Observable<T[]>;

  create(body: any, options: any): Observable<T>;
  update(id: string, body: any, options: any): Observable<T>;
  delete(id: string): Observable<any>;
}
