import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { GroupComponent } from './group/group.component';
import { HospitalComponent } from './hospital/hospital.component';
import { JobComponent } from './job/job.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { GroupDetailComponent } from './group/group-detail/group-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ManageComponent,
  },
];


@NgModule({
  declarations: [
    ManageComponent,
    GroupComponent,
    HospitalComponent,
    JobComponent,
    GroupDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatTabsModule,
    MatIconModule,
    MatChipsModule
  ]
})
export class ManageModule { }
