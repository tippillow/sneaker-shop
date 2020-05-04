import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PathConfig } from './config/routing/path.config';

const routes: Routes = [
    {
        path: PathConfig.AUTH,
        loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    },
    {
        path: '',
        pathMatch: 'full',
        children: [
            {
                path: PathConfig.MAIN,
                pathMatch: 'full',
                loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPageModule),
            },
        ],
    },
    {
        path: PathConfig.NOVETLY,
        loadChildren: () => import('./pages/novelty/novelty.module').then(m => m.NoveltyModule),
    },
    {
        path: PathConfig.BRANDS,
        loadChildren: () => import('./pages/brands/brands.module').then(m => m.BrandsModule),
    },
    {
        path: PathConfig.SHOES,
        loadChildren: () => import('./pages/shoes/shoes.module').then(m => m.ShoesModule),
    },
    {
        path: PathConfig.BASKET,
        loadChildren: () => import('./pages/basket/basket.module').then(m => m.BasketModule),
    },
    {
        path: PathConfig.SEARCH,
        loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule),
    },
    {
        path: PathConfig.ANY,
        redirectTo: '',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        useHash: false,
        relativeLinkResolution: 'corrected'
    })],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
