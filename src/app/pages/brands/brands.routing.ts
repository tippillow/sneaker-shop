import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrandsComponent } from './brands.component';
import { BrandComponent } from './components/smart/brand/brand.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: BrandsComponent,
    },
    {
        path: 'brand/:brand',
        component: BrandComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class BrandsRoutingModule { }
