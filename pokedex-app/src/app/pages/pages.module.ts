import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ListViewComponent } from './list-view/list-view.component';
import { SelectViewComponent } from './select-view/select-view.component';
import { GlobalModules } from '../global.module';

@NgModule({
  declarations: [
    ListViewComponent,
    SelectViewComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    GlobalModules
  ]
})
export class PagesModule { }
