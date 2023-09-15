import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ListViewComponent } from './pokemon/list-view/list-view.component';
import { SelectViewComponent } from './pokemon/select-view/select-view.component';
import { GlobalModules } from '../global.module';
import { BerryListComponent } from './berry/berry-list/berry-list.component';
import { BerrySelectComponent } from './berry/berry-select/berry-select.component';

@NgModule({
  declarations: [
    ListViewComponent,
    SelectViewComponent,
    BerryListComponent,
    BerrySelectComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    GlobalModules
  ]
})
export class PagesModule { }
