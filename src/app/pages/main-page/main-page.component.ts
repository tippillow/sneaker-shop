import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, from, Subject } from 'rxjs';
import { MainPageService } from '../../services/main-page/main-page.service';
import { PROMO_PHOTOS, RECOMMENDED } from '../../config/constants/url.constants';
import { IRecommendedItemInterface } from '../../interfaces/recomended-item.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.less']
})
export class MainPageComponent implements OnInit, OnDestroy {

    public promoPhotos$: Observable<string[]>;
    public recommendedItems$: Observable<IRecommendedItemInterface[]>;

    private destroy$: Subject<boolean> = new Subject<boolean>();


    constructor(private mainPageService: MainPageService) { }

    ngOnInit() {
        this.mainPageService.fetchPromoPhotos$(PROMO_PHOTOS)
            .pipe(
                takeUntil(this.destroy$)
            ).subscribe();

        this.mainPageService.fetchRecommendedItems$(RECOMMENDED)
            .pipe(
                takeUntil(this.destroy$)
            ).subscribe();

        this.promoPhotos$ = this.mainPageService.promoPhotos$;
        this.recommendedItems$ = this.mainPageService.recommendedItems$;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
