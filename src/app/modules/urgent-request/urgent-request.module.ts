import { BookmarkedComponent } from './bookmarked/bookmarked.component';
import { JoinedComponent } from './joined/joined.component';
import { CreatedComponent } from './created/created.component';
import { SuggestedComponent } from './suggested/suggested.component';
import { MatTabsModule } from '@angular/material/tabs';
import { FormControl, NgForm } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  MatFormFieldModule,
  MatLabel,
  MatFormFieldControl,
} from '@angular/material/form-field';
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
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

const routes: Routes = [
  {
    path: '',
    component: UrgentRequestComponent,
  },
];

@NgModule({
  declarations: [
    UrgentRequestComponent,
    RequestContainerComponent,
    MapsComponent,
    RequestFormComponent,
    SuggestedComponent,
    CreatedComponent,
    JoinedComponent,
    BookmarkedComponent
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
    MatTabsModule
  ],
})
export class UrgentRequestModule { }
