import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GroupComponent } from './group.component';
import { MatDividerModule } from '@angular/material/divider';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { MatIconModule } from '@angular/material/icon';
import { CreateGroupComponent } from './create-group/create-group.component';
const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
  },
];
@NgModule({
  declarations: [GroupComponent, GroupDetailComponent, CreateGroupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FlexLayoutModule,
    MatDividerModule,
    MatIconModule,
  ],
})
export class GroupModule {}
