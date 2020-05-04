import { Injectable } from '@angular/core';
import { BackendService } from '../backend/backend.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, take, filter, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import {URL_PARAMS} from '../../config/url-params.configs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {

    private _searchingItems$ = new BehaviorSubject<any[]>(null);
    private _error$ = new BehaviorSubject<string>(null);

    constructor(private backendService: BackendService) { }

    public get searchingItems$(): Observable<any[]> {
        return this._searchingItems$.asObservable();
    }

    public get error$(): Observable<string> {
        return this._error$.asObservable();
    }

    public search$(searchingString: string): Observable<any> {
        return this.backendService.get$(URL_PARAMS.GET_SEARCHED_ITEM(searchingString))
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    this._searchingItems$.next(null);
                    this.onFetchError(error);

                    return of(false);
                }),
                take(1),
                filter((items: any) => !!items),
                tap((items: any) => {
                    if (Array.isArray(items)) {
                        this._searchingItems$.next(items);
                    } else {
                        this._searchingItems$.next([items]);
                    }
                }),
            );
    }

    private onFetchError(error: HttpErrorResponse): void {
        this._error$.next(error.message);
    }
}
