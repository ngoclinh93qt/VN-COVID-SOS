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

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    HospitalComponent,
    BlockedComponent,
    AuthenComponent,
    CardComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
