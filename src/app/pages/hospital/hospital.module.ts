import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HospitalComponent } from './hospital.component';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HospitalSidenavComponent } from './hospital-sidenav/hospital-sidenav.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: HospitalComponent,
  },
];

@NgModule({
  declarations: [HospitalComponent, HospitalSidenavComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
  ],
})
export class HospitalModule {}
