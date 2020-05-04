import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, take, filter, map, tap } from 'rxjs/operators';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';
import { IShoeDto } from 'src/app/interfaces/dto/shoe.dto';
import { mapShoeDtoListToShoeInterfaceList } from '../../utils/map-shoe-dto-list-to-shoe-interface-list/map-shoe-dto-list-to-shoe-interface-list';

@Injectable({
    providedIn: 'root'
})
export class NoveltyService {

    private _noveltyItems$ = new BehaviorSubject<IShoeItemInterface[]>(null);
    private _errorMessage: string;

    constructor(private backendService: BackendService) { }

    public get noveltyItems$(): Observable<IShoeItemInterface[]> {
        return this._noveltyItems$.asObservable();
    }

    public fetchNoveltyItems$(url: string): Observable<IShoeItemInterface[]> {
        return this.backendService.get$(url)
            .pipe(
                catchError(error => {
                    this.onFetchError(error);

                    return of(false);
                }),
                take(1),
                filter((items: IShoeDto[]) => !!items),
                map(mapShoeDtoListToShoeInterfaceList),
                tap((items: IShoeItemInterface[]) => this._noveltyItems$.next(items)),
            );
    }

    private onFetchError(error: HttpErrorResponse): void {
        this._errorMessage = error.message;
    }

}
