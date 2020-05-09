import {Injectable} from '@angular/core';
import {BackendService} from '../backend/backend.service';
import {Observable, of, BehaviorSubject} from 'rxjs';
import {catchError, take, filter, map, tap} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {IShoeItemInterface} from 'src/app/interfaces/shoe-item.interface';
import {IShoeDto} from 'src/app/interfaces/dto/shoe.dto';
import {mapShoeDtoListToShoeInterfaceList} from '../../utils/map-shoe-dto-list-to-shoe-interface-list/map-shoe-dto-list-to-shoe-interface-list';
import {Sizes} from '../../config/enums/sizes.enum';
import {Brands} from '../../config/enums/brands.enum';
import {Genders} from '../../config/enums/genders.enum';
import {IFiltersFormInterface} from '../../interfaces/filters-form.interface';

@Injectable({
    providedIn: 'root'
})
export class ShoesService {

    private _shoeItems$ = new BehaviorSubject<IShoeItemInterface[]>(null);
    private _shoeItemsCopy$ = new BehaviorSubject<IShoeItemInterface[]>(null);
    private _errorMessage: string;

    constructor(private backendService: BackendService) {
    }

    public get shoeItems$(): Observable<IShoeItemInterface[]> {
        return this._shoeItems$.asObservable();
    }

    public fetchShoeItems$(url: string): Observable<IShoeItemInterface[]> {
        return this.backendService.get$(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.onFetchError(error);

                    return of(false);
                }),
                take(1),
                filter((items: IShoeDto[]) => !!items),
                map(mapShoeDtoListToShoeInterfaceList),
                tap((items: IShoeItemInterface[]) => this._shoeItems$.next(items)),
                tap((items: IShoeItemInterface[]) => this._shoeItemsCopy$.next(items)),
            );
    }

    public shoeFiltration(filtersFormValue: IFiltersFormInterface): void {
        const filteredShoes = this._shoeItemsCopy$.value.filter((shoe: IShoeItemInterface) => {
            return this.isNeededBrand(filtersFormValue.brand, shoe) && this.isNeededSize(filtersFormValue.size, shoe) && this.isNeededGender(filtersFormValue.gender, shoe);
        });
        this._shoeItems$.next(filteredShoes);
    }

    public resetFilteredShoes(): void {
        this._shoeItems$.next(this._shoeItemsCopy$.value);
    }

    private isNeededBrand(brandFilterValue: string, shoe: IShoeItemInterface): boolean {
        return brandFilterValue ? Brands[brandFilterValue] === shoe.brand : true;
    }

    private isNeededSize(sizeFilterValue: string, shoe: IShoeItemInterface): boolean {
        return sizeFilterValue ? shoe.sizes.includes(Sizes[sizeFilterValue]) : true;
    }

    private isNeededGender(genderFilterValue: string, shoe: IShoeItemInterface): boolean {
        return genderFilterValue ? Genders[genderFilterValue] === shoe.gender : true;
    }

    private onFetchError(error: HttpErrorResponse): void {
        this._errorMessage = error.message;
    }

}
