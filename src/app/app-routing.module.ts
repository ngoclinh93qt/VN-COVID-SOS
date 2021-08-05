import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { AuthenComponent } from './pages/authen/authen.component';
import { ContainerComponent } from './pages/container/container.component';

const routes: Routes = [
  {
    path: "login",
    component: AuthenComponent
  },
  {
    path: "",
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
     // { path: '', redirectTo: 'news', pathMatch: 'full' },
      {
        path: "news",
        loadChildren: ()=> import('./pages/news/news.module').then(m => m.NewsModule),
      },
      {
        path: "hospital",
        loadChildren: ()=> import('./pages/hospital/hospital.module').then(m => m.HospitalModule),
      },
      {
        path: "blocked",
        loadChildren: ()=> import('./pages/blocked/blocked.module').then(m => m.BlockedModule),
      },{
        path: "home",
        loadChildren: ()=> import('./pages/home/home.module').then(m => m.HomeModule),
      },
    ]
  },
  { path: '**', redirectTo: 'login' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
