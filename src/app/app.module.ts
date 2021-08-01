import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './pages/news/news.component';
import { HospitalComponent } from './pages/hospital/hospital.component';
import { BlockedComponent } from './pages/blocked/blocked.component';
import { AuthenComponent } from './pages/authen/authen.component';
import { CardComponent } from './shared/components/card/card.component';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDividerModule} from '@angular/material/divider';
import { CardBlockedComponent } from './shared/components/card-blocked/card-blocked.component';


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    HospitalComponent,
    BlockedComponent,
    AuthenComponent,
    CardComponent,
    NotificationComponent,
    CardBlockedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
