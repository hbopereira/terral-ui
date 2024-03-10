import { NgModule } from '@angular/core';
import { VendaComponent } from './venda.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@NgModule({
    imports: [
        TableModule,
        ButtonModule,
        AutoCompleteModule,
        FormsModule,
        CommonModule,
        DialogModule,
        InputNumberModule,
        TooltipModule,
        ProgressSpinnerModule
    ],
    declarations: [
        VendaComponent,
    ],
    exports: [],
    bootstrap: [VendaComponent]
})
export class VendaModule { }