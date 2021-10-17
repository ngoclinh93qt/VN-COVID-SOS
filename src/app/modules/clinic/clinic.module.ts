import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClinicComponent } from './clinic.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { RequestContainerComponent } from 'src/app/shared/components/request-container/request-container.component';
import { BookmarkedComponent } from '../urgent-request/bookmarked/bookmarked.component';
import { CreatedComponent } from '../urgent-request/created/created.component';
import { JoinedComponent } from '../urgent-request/joined/joined.component';

import { RequestFormComponent } from '../urgent-request/request-form/request-form.component';
import { SuggestForComponent } from '../urgent-request/suggest-for/suggest-for.component';
import { SuggestedComponent } from '../urgent-request/suggested/suggested.component';
import { UrgentRequestComponent } from '../urgent-request/urgent-request.component';
import { ClinicContainerComponent } from './clinic-container/clinic-container.component';
import { ClinicMapComponent } from './clinic-map/clinic-map.component';
import { ClinicFormComponent } from './clinic-form/clinic-form.component';


const routes: Routes = [
  {
    path: '',
    component: ClinicComponent,
  },
];

@NgModule({
  declarations: [
    ClinicComponent,
    ClinicContainerComponent,
    ClinicMapComponent,
    ClinicFormComponent,


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
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    MatBadgeModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule
  ]
})
export class ClinicModule { }
