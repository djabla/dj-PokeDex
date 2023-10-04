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
import { ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { RippleModule } from 'primeng/ripple';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { GalleriaModule } from 'primeng/galleria';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { AnimateModule } from 'primeng/animate';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
    declarations: [],
    imports: [],
    exports: [
        //Common Modules
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
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
        MatTableModule,
        MatProgressBarModule,
        //PrimeNG Modules
        AutoCompleteModule,
        ButtonModule,
        ScrollPanelModule,
        RippleModule,
        CardModule,
        TabViewModule,
        GalleriaModule,
        OverlayPanelModule,
        DropdownModule,
        AnimateModule,
        InputTextModule,
        DialogModule,
        DynamicDialogModule,
        ProgressBarModule,

    ]
})

export class GlobalModules { }