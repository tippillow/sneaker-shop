import { Component, OnInit, OnDestroy } from '@angular/core';
import { URL_PARAMS } from 'src/app/config/url-params.configs';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { BrandService } from 'src/app/services/brand/brand.service';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.less']
})
export class BrandComponent implements OnInit, OnDestroy {

    public brandItems$: Observable<IShoeItemInterface[]>;
    public brand: string;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private brandService: BrandService) { }

    ngOnInit() {
        this.brand = this.getBrand(window.location.pathname);

        this.brandService.fetchBrandItems$(URL_PARAMS.GET_BRAND_ITEMS(this.brand))
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.brandItems$ = this.brandService.brandItems$;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    private getBrand(url: string): string {
        const partsOfPath = url.split('/');
        const brand = partsOfPath[partsOfPath.length - 1];

        return brand;
    }

}
