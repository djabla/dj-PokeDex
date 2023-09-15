import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListViewComponent } from './pokemon/list-view/list-view.component';
import { SelectViewComponent } from './pokemon/select-view/select-view.component';
import { BerryListComponent } from './berry/berry-list/berry-list.component';
import { BerrySelectComponent } from './berry/berry-select/berry-select.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full'
  },
  {
    path: 'pokemon',
    component: ListViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'pokemon/:name',
    component: SelectViewComponent,
    pathMatch: 'full'
  },
  {
    path: 'search/pokemon/:name',
    redirectTo: 'pokemon/:name',
    pathMatch: 'full'
  },
  {
    path: 'berry',
    component: BerryListComponent,
    pathMatch: 'full'
  },
  {
    path: 'berry/:name',
    component: BerrySelectComponent,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
