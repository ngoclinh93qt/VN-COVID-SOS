import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardBlockedComponent, NotificationComponent } from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { SosInputComponent } from './components/sos-input/sos-input.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,
    SosInputComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,
    SosInputComponent
  ],
})
export class SharedModule { }
