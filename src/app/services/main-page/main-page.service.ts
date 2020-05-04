import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IRecomendedDto } from '../../interfaces/dto/recomended.dto';
import { IRecommendedItemInterface } from '../../interfaces/recomended-item.interface';

@Injectable({
    providedIn: 'root'
})
export class MainPageService {

    private _promoPhotos$ = new BehaviorSubject<string[]>(null);
    private _recommendedItems$ = new BehaviorSubject<IRecommendedItemInterface[]>(null);
    private _errorMessage: string;


    constructor(private backendService: BackendService) { }

    public get promoPhotos$(): Observable<string[]> {
        return this._promoPhotos$.asObservable();
    }

    public get recommendedItems$(): Observable<IRecommendedItemInterface[]> {
        return this._recommendedItems$.asObservable();
    }

    public fetchPromoPhotos$(url: string): Observable<string[]> {
        return this.backendService.get$(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.onFetchError(error);

                    return of(false);
                }),
                take(1),
                filter((photos: string[]) => !!photos),
                tap((photos: string[]) => this._promoPhotos$.next(photos)),
            );
    }

    public fetchRecommendedItems$(url: string): Observable<IRecommendedItemInterface[]> {
        return this.backendService.get$(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.onFetchError(error);

                    return of(false);
                }),
                take(1),
                filter((items: IRecomendedDto[]) => !!items),
                map(this.mapRecommendedDtoToRecommendedInterface),
                tap((items: IRecommendedItemInterface[]) => this._recommendedItems$.next(items)),
            );
    }

    private onFetchError(error: HttpErrorResponse): void {
        this._errorMessage = error.message;
    }

    private mapRecommendedDtoToRecommendedInterface(items: IRecomendedDto[]): IRecommendedItemInterface[] {
        return items.map((item: IRecomendedDto) => {
            const { title, photo } = item;

            return {
                title,
                photo,
            };
        });
    }
}
