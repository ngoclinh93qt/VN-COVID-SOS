import { TransCardComponent } from './components/trans-card/trans-card.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CardComponent,
  CardBlockedComponent,
  NotificationComponent,
} from './components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { SosInputComponent } from './components/sos-input/sos-input.component';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { RequestCardComponent } from './components/request-card/request-card.component';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { LoginFrameComponent } from './components/login-frame/login-frame.component';
import {
  RequestCardDetailsComponent,
  JoinRequestComponent,
} from './components/request-card-details/request-card-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './components/loading/loading.service';
import { NotificationService } from './components/notification/notification.service';
import { httpInterceptorProviders } from '../core/interceptors';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { MemberComponent } from './components/member/member.component';
import { UploadComponent } from './components/upload/upload.component';
import { MatInputModule } from '@angular/material/input';
import { TransFormComponent } from './components/trans-form/trans-form.component';
import { CommentComponent } from './components/comment/comment.component';
import { RequestContainerComponent } from './components/request-container/request-container.component';
@NgModule({
  declarations: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,
    SosInputComponent,
    ButtonComponent,
    RequestCardComponent,
    CommentBoxComponent,
    PostCardComponent,
    TransCardComponent,
    LoginFrameComponent,
    JoinRequestComponent,
    RequestCardDetailsComponent,
    LoadingComponent,
    GroupCardComponent,
    MemberComponent,
    UploadComponent,
    TransFormComponent,
    CommentComponent,
    RequestContainerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [
    CardComponent,
    CardBlockedComponent,
    NotificationComponent,
    SosInputComponent,
    ButtonComponent,
    RequestCardComponent,
    CommentBoxComponent,
    PostCardComponent,
    LoginFrameComponent,
    RequestCardDetailsComponent,
    LoadingComponent,
    GroupCardComponent,
    MemberComponent,
    TransCardComponent,
    TransFormComponent,
    RequestContainerComponent,
  ],
  providers: [
    HttpClientModule,
    LoadingService,
    NotificationService,
    httpInterceptorProviders,
  ],
})
export class SharedModule {}
