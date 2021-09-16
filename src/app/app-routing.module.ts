import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenComponent } from './modules/authen/authen.component';
import { SignupComponent } from './modules/signup/signup.component';
import { ContainerComponent } from './modules/container/container.component';
import { AuthGuard } from './core/guards';
import { UserLoginComponent } from './modules/user-login/user-login.component';

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
      // {
      //   path: 'news',
      //   loadChildren: () =>
      //     import('./modules/news/news.module').then((m) => m.NewsModule),
      // },
      // {
      //   path: 'manage',
      //   loadChildren: () =>
      //     import('./modules/manage/manage.module').then((m) => m.ManageModule),
      // },
      // {
      //   path: 'hospital',
      //   loadChildren: () =>
      //     import('./modules/hospital/hospital.module').then(
      //       (m) => m.HospitalModule
      //     ),
      // },
      {
        path: 'group',
        loadChildren: () =>
          import('./modules/group/group.module').then((m) => m.GroupModule),
      },
      // {
      //   path: 'blocked',
      //   loadChildren: () =>
      //     import('./modules/blocked/blocked.module').then((m) => m.BlockedModule),
      // },
      // {
      //   path: 'home',
      //   loadChildren: () =>
      //     import('./modules/home/home.module').then((m) => m.HomeModule),
      // },
      {
        path: 'urgentRequest',
        loadChildren: () =>
          import('./modules/urgent-request/urgent-request.module').then(
            (m) => m.UrgentRequestModule
          ),
      },

      { path: '**', redirectTo: 'urgentRequest' }
    ],
  },
  // { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
