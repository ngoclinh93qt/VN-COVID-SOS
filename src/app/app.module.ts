import { UserSignupComponent } from './modules/user-signup/user-signup.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenComponent } from './modules/authen/authen.component';
import { SignupComponent } from './modules/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { ContainerComponent } from './modules/container/container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { AuthenService } from './core/http/authen.service';
import { SignupService } from './core/http/signup.service';
import { UserLoginComponent } from './modules/user-login/user-login.component';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ProfileComponent } from './modules/profile/profile.component';
import {UpdateNameComponent} from './modules/profile/update-name/update-name.component'
@NgModule({
  declarations: [
    AppComponent,
    AuthenComponent,
    ContainerComponent,
    SignupComponent,
    UserLoginComponent,
    UserSignupComponent,
    ProfileComponent,
    UpdateNameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    CoreModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
    AuthenService,
    MatSidenavModule,
    SignupService,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
