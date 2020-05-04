import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoesComponent } from './shoes.component';
import { ShoeComponent } from './components/smart/shoe/shoe.component';

export const routes: Routes = [
    {
        path: '',
        component: ShoesComponent,
    },
    {
        path: 'shoe/:name',
        component: ShoeComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class ShoesRoutingModule { }
