import { MatIconModule } from '@angular/material/icon';
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
import { ButtonComponent } from './components/button/button.component';
import { RequestCardComponent } from './components/request-card/request-card.component';
import { LoginFrameComponent } from './components/login-frame/login-frame.component';



@NgModule({
  declarations: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,
    SosInputComponent,
    ButtonComponent,
    RequestCardComponent,
    LoginFrameComponent,

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
    SosInputComponent,
    ButtonComponent,
    RequestCardComponent,
    LoginFrameComponent
  ],
})
export class SharedModule { }
