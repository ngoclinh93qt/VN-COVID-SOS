import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenComponent } from './pages/authen/authen.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ContainerComponent } from './pages/container/container.component';
import { AuthGuard } from './shared/guards';
import { UserLoginComponent } from './pages/user-login/user-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthenComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'user-login',
    component: UserLoginComponent,
  },
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      // { path: '', redirectTo: 'news', pathMatch: 'full' },
      {
        path: 'news',
        loadChildren: () =>
          import('./pages/news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'manage',
        loadChildren: () =>
          import('./pages/manage/manage.module').then((m) => m.ManageModule),
      },
      {
        path: 'hospital',
        loadChildren: () =>
          import('./pages/hospital/hospital.module').then(
            (m) => m.HospitalModule
          ),
      },
      {
        path: 'group',
        loadChildren: () =>
          import('./pages/group/group.module').then((m) => m.GroupModule),
      },
      {
        path: 'blocked',
        loadChildren: () =>
          import('./pages/blocked/blocked.module').then((m) => m.BlockedModule),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'urgentRequest',
        loadChildren: () =>
          import('./pages/urgent-request/urgent-request.module').then(
            (m) => m.UrgentRequestModule
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
