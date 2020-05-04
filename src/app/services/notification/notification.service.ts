import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notification, NotificationType } from './notification';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private _notification$ = new Subject<Notification>();
    private index = 0;

    constructor() { }

    public get notification$(): Observable<Notification> {
        return this._notification$.asObservable();
    }

    public success(title: string, message: string, timeout: number): void {
        this._notification$.next(new Notification(this.index++, NotificationType.success, title, message, timeout));
    }

    public error(title: string, message: string, timeout: number): void {
        this._notification$.next(new Notification(this.index++, NotificationType.error, title, message, timeout));
    }
}
