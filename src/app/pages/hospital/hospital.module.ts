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
import { StatusDialogComponent } from './hospital-sidenav/status-dialog/status-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { CreateHospitalComponent } from './create-hospital/create-hospital.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
const routes: Routes = [
  {
    path: '',
    component: HospitalComponent,
  },
];

@NgModule({
  declarations: [
    HospitalComponent,
    HospitalSidenavComponent,
    StatusDialogComponent,
    CreateHospitalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatInputModule,
    MatSidenavModule,
    MatTabsModule,
    MatIconModule,
    MatDividerModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
  ],
})
export class HospitalModule {}
