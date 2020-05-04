import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BasketComponent } from './basket.component';

export const routes: Routes = [
    {
        path: '',
        component: BasketComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BasketRoutingModule { }
