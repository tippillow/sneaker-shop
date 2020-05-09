import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './smart/header/header.component';
import { FooterComponent } from './dumb/footer/footer.component';
import { PromoComponent } from './dumb/promo/promo.component';
import { PromoItemComponent } from './dumb/promo/components/dumb/promo-item/promo-item.component';
import { NavigationComponent } from './smart/header/components/dumb/navigation/navigation.component';
import { RecommendedComponent } from './smart/recommended/recommended.component';
import { RecommendedItemComponent } from './smart/recommended/components/dumb/recommended-item/recommended-item.component';
import { GalleryComponent } from './smart/gallery/gallery.component';
import { CustomSizesComponent } from './smart/custom-sizes/custom-sizes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoeItemComponent } from './smart/shoe-item/shoe-item.component';
import { CutPipe } from '../pipes/cut/cut.pipe';
import { NotificationComponent } from './smart/notification/notification.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CustomSelectComponent } from './dumb/custom-select/custom-select.component';

const SHARED_COMPONENTS = [
    HeaderComponent,
    FooterComponent,
    PromoComponent,
    NavigationComponent,
    RecommendedComponent,
    RecommendedItemComponent,
    GalleryComponent,
    CustomSizesComponent,
    ShoeItemComponent,
    NotificationComponent,
    CustomSelectComponent,
    PromoItemComponent,
    CutPipe
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ScrollingModule
    ],
    declarations: [
        ...SHARED_COMPONENTS,
    ],
    exports: [...SHARED_COMPONENTS],
})
export class SharedModule { }
