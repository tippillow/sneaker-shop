import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(protected http: HttpClient) { }

    public get$<T>(url: string): Observable<T> {
        return this.http.get<T>(url);
    }

    public post$<T>(url: string, options: any): Observable<T> {
        return this.http.post<T>(url, options);
    }

}
