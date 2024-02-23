import { NgModule } from '@angular/core';
import { RelatorioProdutoColaboradorComponent } from './relatorio-produto-colaborador.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';

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
        InputSwitchModule
    ],
    declarations: [
        RelatorioProdutoColaboradorComponent,
    ],
    exports: [],
    bootstrap: [RelatorioProdutoColaboradorComponent]
})
export class RelatorioProdutoColaboradorModule { }