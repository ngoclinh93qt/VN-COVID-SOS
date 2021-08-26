import { ComponentType } from '@angular/cdk/portal';
import { Component, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(component: ComponentType<any>, config?: any): Observable<any> {
    let ref = this.dialog.open(component, config);
    return ref.afterClosed().pipe(tap(() => ref.close()));
  }
}
