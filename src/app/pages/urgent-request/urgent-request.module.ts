import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UrgentRequestComponent } from './urgent-request.component';
import { RequestContainerComponent } from './request-container/request-container.component';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MapsComponent } from './maps/maps.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RequestFormComponent } from './request-form/request-form.component';
import { MatInputModule } from '@angular/material/input';
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
    MapsComponent,
    RequestFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ]
})
export class UrgentRequestModule { }
