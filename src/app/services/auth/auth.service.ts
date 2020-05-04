import { Injectable } from '@angular/core';
import { ICredentialsInterface } from 'src/app/interfaces/credentials.interface';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { BackendService } from '../backend/backend.service';
import { catchError, take, filter, tap, map, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IAuthDataInterface } from 'src/app/interfaces/auth-data.interface';
import { Router } from '@angular/router';
import { isString } from 'util';
import { PathConfig } from 'src/app/config/routing/path.config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _errorMessage$ = new BehaviorSubject<string>(null);
    private _isLogged$ = new BehaviorSubject<boolean>(this.isAuthValid);

    constructor(
        private backendService: BackendService,
        private router: Router) { }

    public get isLogged$(): Observable<boolean> {
        return this._isLogged$.asObservable();
    }

    public get errorMessage$(): Observable<string> {
        return this._errorMessage$.asObservable();
    }

    public get isAuthValid(): boolean {
        if (!this.authData) {
            return false;
        }

        const accessToken = this.authData.accessToken;

        return typeof (accessToken) === 'string' && accessToken.length !== 0;
    }

    public get isActiveToken(): boolean {
        if (!this.authData) {
            return false;
        }

        const currentDate = new Date().getTime();
        const tokenExpires = this.authData.exp;

        return tokenExpires - currentDate > 0;
    }

    public get authData(): IAuthDataInterface {
        return JSON.parse(localStorage.authData);
    }

    private checkAuthorization(): void {
        if (!this.isAuthValid) {
            this.resetAuthData();

            return;
        }

        this.router.navigate([PathConfig.MAIN]);
    }

    public login$(url: string, credentials: ICredentialsInterface): Observable<any> {
        return this.fetchToken$(url, credentials).pipe(
            finalize(() => this.checkAuthorization()),
        );
    }

    public fetchToken$(url: string, credentials: ICredentialsInterface): Observable<IAuthDataInterface> {
        return this.backendService.post$(url, credentials).pipe(
            catchError((error: HttpErrorResponse) => {
                this.onFetchError(error);

                return of(false);
            }),
            take(1),
            filter((token: {accessToken: string}) => !!token),
            tap((token: {accessToken: string}) => localStorage.setItem('authData', JSON.stringify({ accessToken: token.accessToken }))),
            map(this.parseJwt),
            tap((authData: IAuthDataInterface) => localStorage.setItem('authData', JSON.stringify(authData))),
            tap(() => this._isLogged$.next(true)),
        );
    }

    public resetAuthData(): void {
        localStorage.authData = null;
        this._isLogged$.next(false);
    }

    public logout(): void {
        this.resetAuthData();
    }

    private parseJwt(token): IAuthDataInterface {
        const base64Url = token.accessToken.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const authData = JSON.parse(jsonPayload);
        authData.accessToken = token.accessToken;
        return authData;
    }

    private onFetchError(error: HttpErrorResponse): void {
        this._errorMessage$.next(error.statusText + ' ' + error.status);
    }
}
