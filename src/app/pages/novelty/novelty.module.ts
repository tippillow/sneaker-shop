import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoveltyComponent } from './novelty.component';
import { NovetlyRoutingModule } from './novetly.routing';
import { SharedModule } from '../../components/shared.module';

@NgModule({
    imports: [
        CommonModule,
        NovetlyRoutingModule,
        SharedModule
    ],
    declarations: [
        NoveltyComponent,
    ]
})
export class NoveltyModule { }
