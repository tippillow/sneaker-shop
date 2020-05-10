import {Component, OnInit, OnDestroy, ViewChildren, QueryList} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {IShoeItemInterface} from 'src/app/interfaces/shoe-item.interface';
import {SHOES} from '../../config/constants/url.constants';
import {ShoesService} from 'src/app/services/shoes/shoes.service';
import {Brands} from '../../config/enums/brands.enum';
import {FormControl, FormGroup} from '@angular/forms';
import {Genders} from '../../config/enums/genders.enum';
import {Sizes} from '../../config/enums/sizes.enum';
import {CustomSelectComponent} from '../../components/dumb/custom-select/custom-select.component';

@Component({
    selector: 'app-shoes',
    templateUrl: './shoes.component.html',
    styleUrls: ['./shoes.component.less']
})
export class ShoesComponent implements OnInit, OnDestroy {

    @ViewChildren('select') selects: QueryList<CustomSelectComponent>;

    public shoeItems$: Observable<IShoeItemInterface[]>;
    public brands = Object.keys(Brands);
    public genders = Object.keys(Genders).map((gender: string) => Genders[gender]);
    public sizes = Object.keys(Sizes);
    public filtersForm: FormGroup;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private shoesService: ShoesService) {
    }

    ngOnInit() {
        this.shoesService.fetchShoeItems$(SHOES)
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe();


        this.shoeItems$ = this.shoesService.shoeItems$;
        this.filtersForm = this.constructForm();

        this.filtersForm.valueChanges.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => this.shoesService.shoeFiltration(this.filtersForm.value));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onResetClick(): void {
        this.filtersForm.reset();
        this.shoesService.resetFilteredShoes();
        this.selects.forEach((select: CustomSelectComponent) => select.label.nativeElement.textContent = select.labelText);
    }

    private constructForm(): FormGroup {
        return new FormGroup({
            brand: new FormControl(''),
            gender: new FormControl(''),
            size: new FormControl(''),
        });
    }
}
