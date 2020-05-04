import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, take, tap, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IBrandDto } from '../../interfaces/dto/brand.dto';
import { IBrandItemInterface } from 'src/app/interfaces/brand-item.interface';

@Injectable({
    providedIn: 'root'
})
export class BrandsService {

    private _brandPhotos$ = new BehaviorSubject<IBrandItemInterface[]>(null);
    private _errorMessage: string;

    constructor(private backendService: BackendService) { }

    public get brandPhotos$(): Observable<IBrandItemInterface[]> {
        return this._brandPhotos$.asObservable();
    }

    public fetchBrandPhotos$(url: string): Observable<IBrandItemInterface[]> {
        return this.backendService.get$(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this.onFetchError(error);

                    return of(false);
                }),
                take(1),
                filter((items: IBrandDto[]) => !!items),
                map(this.mapBrandDtoToBrandInterface),
                tap((items: IBrandItemInterface[]) => this._brandPhotos$.next(items)),
            );
    }

    private mapBrandDtoToBrandInterface(items: IBrandDto[]): IBrandItemInterface[] {
        return items.map((item: IBrandDto) => {
            const { brand, photo } = item;

            return {
                brand,
                photo,
            };
        });
    }

    private onFetchError(error: HttpErrorResponse): void {
        this._errorMessage = error.message;
    }
}
