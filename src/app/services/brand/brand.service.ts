import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';
import { catchError, take, filter, map, tap } from 'rxjs/operators';
import { IShoeDto } from 'src/app/interfaces/dto/shoe.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { mapShoeDtoListToShoeInterfaceList } from '../../utils/map-shoe-dto-list-to-shoe-interface-list/map-shoe-dto-list-to-shoe-interface-list';

@Injectable({
    providedIn: 'root'
})
export class BrandService {

    private _barndItems$ = new BehaviorSubject<IShoeItemInterface[]>(null);
    private _errorMessage: string;

    constructor(private backendService: BackendService) { }

    public get brandItems$(): Observable<IShoeItemInterface[]> {
        return this._barndItems$.asObservable();
    }

    public fetchBrandItems$(url: string): Observable<IShoeItemInterface[]> {
        return this.backendService.get$(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.onFetchError(error);

                    return of(false);
                }),
                take(1),
                filter((items: IShoeDto[]) => !!items),
                map(mapShoeDtoListToShoeInterfaceList),
                tap((items: IShoeItemInterface[]) => this._barndItems$.next(items)),
            );
    }

    private onFetchError(error: HttpErrorResponse): void {
        this._errorMessage = error.message;
    }

}
