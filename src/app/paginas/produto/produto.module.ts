import { ProdutoRoutingModule } from "./produto.routing.module";
import { ProdutoComponent } from "./produto.component";
import { NgModule } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule }   from '@angular/forms';
import { CommonModule } from "@angular/common";
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
    imports: [
      ProdutoRoutingModule,
      HttpClientModule,
      TableModule,
      ButtonModule,
      AutoCompleteModule,
      FormsModule,
      CommonModule,
      DialogModule,
      TooltipModule,
      InputNumberModule,
      ProgressSpinnerModule,
      CheckboxModule
    ],
    declarations: [
      ProdutoComponent,
    ],
    exports: [],
    bootstrap: [ProdutoComponent]
  })
  export class ProdutoModule { }