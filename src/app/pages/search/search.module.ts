import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SharedModule } from 'src/app/components/shared.module';
import { SearchRoutingModule } from './search.routing';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SearchRoutingModule,
    ],
    declarations: [SearchComponent]
})
export class SearchModule { }
