import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BrandsService } from 'src/app/services/brands/brands.service';
import { takeUntil } from 'rxjs/operators';
import { BRANDS } from '../../config/constants/url.constants';
import { IBrandItemInterface } from 'src/app/interfaces/brand-item.interface';

@Component({
    selector: 'app-brands',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.less']
})
export class BrandsComponent implements OnInit, OnDestroy {

    public brandPhotos$: Observable<IBrandItemInterface[]>;

    private destroy$: Subject<boolean> = new Subject<boolean>();


    constructor(private brandsService: BrandsService) { }

    ngOnInit() {
        this.brandsService.fetchBrandPhotos$(BRANDS)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.brandPhotos$ = this.brandsService.brandPhotos$;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
