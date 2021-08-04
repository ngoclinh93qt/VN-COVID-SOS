import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardBlockedComponent, NotificationComponent } from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    
  ],
  exports: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,
  ],
})
export class SharedModule { }
