import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NOVELTY } from 'src/app/config/constants/url.constants';
import { NoveltyService } from 'src/app/services/novelty/novelty.service';
import { takeUntil } from 'rxjs/operators';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';

@Component({
    selector: 'app-novelty',
    templateUrl: './novelty.component.html',
    styleUrls: ['./novelty.component.less']
})
export class NoveltyComponent implements OnInit, OnDestroy {

    public noveltyItems$: Observable<IShoeItemInterface[]>;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private noveltyService: NoveltyService) { }

    ngOnInit() {
        this.noveltyService.fetchNoveltyItems$(NOVELTY)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.noveltyItems$ = this.noveltyService.noveltyItems$;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

}
