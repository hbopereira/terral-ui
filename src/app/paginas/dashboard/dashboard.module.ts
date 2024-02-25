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
import { DashboardComponent } from "./dashboard.component";
import { PanelModule} from 'primeng/panel';
import { ChartModule} from 'primeng/chart';

@NgModule({
    imports: [
      HttpClientModule,
      TableModule,
      ButtonModule,
      AutoCompleteModule,
      FormsModule,
      CommonModule,
      DialogModule,
      TooltipModule,
      InputNumberModule,
      PanelModule,
      ChartModule
    ],
    declarations: [
      DashboardComponent,
    ],
    exports: [],
    bootstrap: [DashboardComponent]
  })
  export class DashboardModule { }