import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { httpInterceptorProviders } from './interceptors';
import { HttpClient } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule
  ],
  providers: [
    HttpClient
  ],

})
export class CoreModule { }
