import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';
import { IShoeDto } from 'src/app/interfaces/dto/shoe.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, take, filter, map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ShoeService {

    private _shoe$ = new BehaviorSubject<IShoeItemInterface>(null);
    private _isLoading$ = new BehaviorSubject<boolean>(false);
    private _errorMessage: string;

    constructor(private backendService: BackendService) { }

    public get shoe$(): Observable<IShoeItemInterface> {
        return this._shoe$.asObservable();
    }

    public get isLoading$(): Observable<boolean> {
        return this._isLoading$.asObservable();
    }

    public fetchShoe$(url: string): Observable<IShoeItemInterface> {
        this._isLoading$.next(true);

        return this.backendService.get$(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.onFetchError(error);

                    return of(false);
                }),
                take(1),
                filter((items: IShoeDto) => !!items),
                map(this.mapShoeDtoToShoeInterface),
                tap((item: IShoeItemInterface) => this._shoe$.next(item)),
                tap(() => this._isLoading$.next(false)),
            );
    }

    private mapShoeDtoToShoeInterface(item: IShoeDto): IShoeItemInterface {
        const { brand, price, title, model, mainPhoto, photos, sex, sizes } = item;

        return {
            brand,
            price,
            title,
            model,
            mainPhoto,
            photos,
            sex,
            sizes,
            size: null,
            id: null,
        };
    }

    private onFetchError(error: HttpErrorResponse): void {
        this._errorMessage = error.message;
    }
}
