import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "login",
    loadChildren: ()=> import('./pages/authen/authen.module').then(m => m.AuthenModule)
  },
  {
    path: "news",
    loadChildren: ()=> import('./pages/news/news.module').then(m => m.NewsModule)
  },
  {
    path: "hospital",
    loadChildren: ()=> import('./pages/hospital/hospital.module').then(m => m.HospitalModule)
  },
  {
    path: "blocked",
    loadChildren: ()=> import('./pages/blocked/blocked.module').then(m => m.BlockedModule)
  },{
    path: "",
    loadChildren: ()=> import('./pages/authen/authen.module').then(m => m.AuthenModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
