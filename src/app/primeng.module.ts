import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {BlockUIModule} from 'primeng/blockui';
import {SplitButtonModule} from 'primeng/splitbutton';
import { MessageService } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';

@NgModule({
    declarations: [
    ],
    imports: [
        CardModule, ButtonModule, InputTextModule, CheckboxModule, DropdownModule,DialogModule,
        CalendarModule,RippleModule,MultiSelectModule,TableModule,ToastModule,BlockUIModule,SplitButtonModule
    ], exports: [
        CardModule, ButtonModule, InputTextModule, CheckboxModule, DropdownModule,DialogModule,
        CalendarModule,RippleModule,MultiSelectModule,TableModule,ToastModule,BlockUIModule,SplitButtonModule
    ],
    providers:[MessageService]
})
export class PrimeNgModule { }