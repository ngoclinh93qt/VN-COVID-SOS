import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UrgentRequestComponent } from './urgent-request.component';
import { RequestContainerComponent } from './request-container/request-container.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MapsComponent } from './maps/maps.component';
const routes: Routes = [
  {
    path: "",
    component: UrgentRequestComponent
  }
]

@NgModule({
  declarations: [
    UrgentRequestComponent,
    RequestContainerComponent,
    MapsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatIconModule
  ]
})
export class UrgentRequestModule { }
