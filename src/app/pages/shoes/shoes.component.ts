import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';
import { SHOES } from '../../config/constants/url.constants';
import { ShoesService } from 'src/app/services/shoes/shoes.service';

@Component({
    selector: 'app-shoes',
    templateUrl: './shoes.component.html',
    styleUrls: ['./shoes.component.less']
})
export class ShoesComponent implements OnInit, OnDestroy {

    public shoeItems$: Observable<IShoeItemInterface[]>;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private shoesService: ShoesService) { }

    ngOnInit() {
        this.shoesService.fetchShoeItems$(SHOES)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();

        this.shoeItems$ = this.shoesService.shoeItems$;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
