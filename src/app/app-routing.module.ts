import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewnewComponent } from './newnew/newnew.component';

const routes: Routes = [
  {path: '', redirectTo: '/pages', pathMatch: 'full'},
  {path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  {path: 'newnew', component: NewnewComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
