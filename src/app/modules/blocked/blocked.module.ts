import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HospitalComponent } from '../hospital/hospital.component';
import { BlockedComponent } from './blocked.component';
import { CardBlockedComponent } from 'src/app/shared/components/card-blocked/card-blocked.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: BlockedComponent,
  },
];

@NgModule({
  declarations: [BlockedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
  ],
})
export class BlockedModule {}
