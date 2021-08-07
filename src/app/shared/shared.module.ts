import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardBlockedComponent, NotificationComponent } from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from './components/button/button.component';
import { RequestCardComponent } from './components/request-card/request-card.component';



@NgModule({
  declarations: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,
    ButtonComponent,
    RequestCardComponent,

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule
    
  ],
  exports: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,
    ButtonComponent,
    RequestCardComponent
  ],
})
export class SharedModule { }
