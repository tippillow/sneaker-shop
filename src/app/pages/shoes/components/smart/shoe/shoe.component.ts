import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoeService } from '../../../../../services/shoe/shoe.service';
import { URL_PARAMS } from '../../../../../config/url-params.configs';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { BasketStorageService } from 'src/app/services/basket-storage/basket-storage.service';

@Component({
    selector: 'app-shoe',
    templateUrl: './shoe.component.html',
    styleUrls: ['./shoe.component.less']
})
export class ShoeComponent implements OnInit, OnDestroy {

    public shoe$: Observable<IShoeItemInterface>;
    public isLoading$: Observable<boolean>;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private shoeService: ShoeService,
        private basketStorageService: BasketStorageService
    ) { }

    ngOnInit() {
        this.shoeService.fetchShoe$(URL_PARAMS.GET_SHOE(this.getModel(window.location.pathname)))
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();
        this.shoe$ = this.shoeService.shoe$;
        this.isLoading$ = this.shoeService.isLoading$;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onAddClick(shoe: IShoeItemInterface): void {
        this.basketStorageService.addItem(shoe);
    }

    private getModel(url: string): string {
        const partsOfPath = url.split('/');
        const model = partsOfPath[partsOfPath.length - 1];

        return model;
    }

}
