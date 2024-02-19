import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { CommonModule } from '@angular/common';
import {MenubarModule} from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';

@NgModule({
    imports: [
        CommonModule,
        MenubarModule,
        ButtonModule
    ],
    declarations: [
        MenuComponent
    ],
    exports: [MenuComponent],
    bootstrap: [MenuComponent]
})
export class MenuModule { }