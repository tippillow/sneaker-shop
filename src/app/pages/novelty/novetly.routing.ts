import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NoveltyComponent } from './novelty.component';

export const routes: Routes = [
    {
        path: '',
        component: NoveltyComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class NovetlyRoutingModule { }
