import { NgModule } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoginComponent } from './login.component';


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
        TooltipModule,
        ProgressSpinnerModule
    ],
    declarations: [
        LoginComponent,
    ],
    exports: [],
    bootstrap: [LoginComponent]
})
export class LoginModule { }