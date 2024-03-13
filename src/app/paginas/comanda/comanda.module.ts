
import { NgModule } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { ComandaComponent } from './comanda.component';


@NgModule({
    imports: [
        HttpClientModule,
        TableModule,
        ButtonModule,
        AutoCompleteModule,
        FormsModule,
        CommonModule,
        DialogModule,
        InputNumberModule,
        DropdownModule,
        ProgressSpinnerModule,
        InputSwitchModule,
        TooltipModule,
        CheckboxModule
    ],
    declarations: [
        ComandaComponent,
    ],
    exports: [],
    bootstrap: [ComandaComponent]
})
export class ComandaModule { }