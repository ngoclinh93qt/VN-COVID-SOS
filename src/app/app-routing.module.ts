import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards';
import { AuthenComponent } from './pages/authen/authen.component';

const routes: Routes = [
  {
    path: "login",
    component: AuthenComponent
  },
  {
    path: "news",
    loadChildren: ()=> import('./pages/news/news.module').then(m => m.NewsModule),
    canActivate: [AuthGuard],
  },
  {
    path: "hospital",
    loadChildren: ()=> import('./pages/hospital/hospital.module').then(m => m.HospitalModule),
    canActivate: [AuthGuard],
  },
  {
    path: "blocked",
    loadChildren: ()=> import('./pages/blocked/blocked.module').then(m => m.BlockedModule),
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
