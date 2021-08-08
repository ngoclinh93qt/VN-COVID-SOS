import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './pages/news/news.component';
import { HospitalComponent } from './pages/hospital/hospital.component';
import { BlockedComponent } from './pages/blocked/blocked.component';
import { AuthenComponent } from './pages/authen/authen.component';
import { CardComponent } from './shared/components/card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { httpInterceptorProviders } from './core/interceptors';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { MatDividerModule } from '@angular/material/divider';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardBlockedComponent } from './shared/components/card-blocked/card-blocked.component';
import { AuthenService } from './core/services/rest-services/authen.service';
import { NotificationService } from './core/services/notification.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ContainerComponent } from './pages/container/container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthenComponent,
    ContainerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthenService,
    NotificationService
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
