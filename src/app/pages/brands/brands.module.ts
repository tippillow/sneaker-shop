import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { SharedModule } from '../../components/shared.module';
import { BrandsRoutingModule } from './brands.routing';
import { BrandsItemComponent } from './components/dumb/brands-item/brands-item.component';
import { BrandComponent } from './components/smart/brand/brand.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        BrandsRoutingModule
    ],
    declarations: [
        BrandsComponent,
        BrandsItemComponent,
        BrandComponent
    ]
})
export class BrandsModule { }
