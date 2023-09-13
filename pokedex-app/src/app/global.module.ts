import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatCommonModule} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
        //Common Modules
        FormsModule,
        HttpClientModule,
        //Angular Material Modules
        MatCommonModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatChipsModule,
        //Other Libraries Modules

    ]
})

export class GlobalModules { }