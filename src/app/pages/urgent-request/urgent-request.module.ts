import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UrgentRequestComponent } from './urgent-request.component';
import { RequestContainerComponent } from './request-container/request-container.component';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: "",
    component: UrgentRequestComponent
  }
]

@NgModule({
  declarations: [
    UrgentRequestComponent,
    RequestContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    CoreModule,
    FlexLayoutModule,
  ]
})
export class UrgentRequestModule { }
