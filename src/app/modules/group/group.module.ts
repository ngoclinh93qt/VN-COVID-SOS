import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupComponent } from './group.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateGroupComponent } from './create-group/create-group.component';
import { UpdateAddressComponent } from './group-detail/update-address/update-address.component';
import { UpdateNameComponent } from './group-detail/update-name/update-name.component';
import { UpdatePhoneComponent } from './group-detail/update-phone/update-phone.component';
import { UpdateSupportComponent } from './group-detail/update-support/update-support.component';
import { DeleteGroupComponent } from './group-detail/delete-group/delete-group.component';
const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
  },
];
@NgModule({
  declarations: [GroupComponent, GroupDetailComponent, CreateGroupComponent, UpdateAddressComponent, UpdateNameComponent, UpdatePhoneComponent, UpdateSupportComponent, DeleteGroupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class GroupModule {}
