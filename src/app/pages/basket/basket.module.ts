import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket.component';
import { BasketRoutingModule } from './basket.routing';
import { BasketFormComponent } from './components/dumb/basket-form/basket-form.component';
import { SharedModule } from '../../components/shared.module';
import { BasketInfoComponent } from './components/dumb/basket-info/basket-info.component';
import { ReplaceEndPipe } from '../../pipes/replace-end/replace-end.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        BasketRoutingModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        BasketComponent,
        BasketFormComponent,
        BasketInfoComponent,
        ReplaceEndPipe,
    ]
})
export class BasketModule { }
