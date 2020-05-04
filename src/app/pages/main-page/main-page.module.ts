import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { MainPageRoutingModule } from './main-page.routing';
import {SharedModule} from '../../components/shared.module';

@NgModule({
    imports: [
        CommonModule,
        MainPageRoutingModule,
        SharedModule,
    ],
    declarations: [
        MainPageComponent
    ]
})
export class MainPageModule { }
