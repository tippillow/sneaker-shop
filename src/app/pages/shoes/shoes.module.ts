import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoesComponent } from './shoes.component';
import { SharedModule } from '../../components/shared.module';
import { ShoesRoutingModule } from './shoes.routing';
import { ShoeComponent } from './components/smart/shoe/shoe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoeInfoComponent } from './components/smart/shoe-info/shoe-info.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ShoesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    ShoesComponent,
    ShoeComponent,
    ShoeInfoComponent
  ]
})
export class ShoesModule { }
