import { Component, OnInit, OnDestroy } from '@angular/core';
import { Notification, NotificationType } from 'src/app/services/notification/notification';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.less']
})
export class NotificationComponent implements OnInit, OnDestroy {

    public notifications: Notification[] = [];

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.notificationService.notification$
            .pipe(
                takeUntil(this.destroy$)
            )
            .subscribe(notification => this.addNotification(notification));
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public closeNotification(notification: Notification): void {
        this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
    }


    public getClassName(notification: Notification): string {

        if (notification.type === NotificationType.success) {
            return 'success';
        }

        if (notification.type === NotificationType.error) {
            return 'error';
        }
    }

    private addNotification(notification: Notification): void {
        this.notifications.push(notification);

        if (notification.timeout !== 0) {
            setTimeout(() => this.closeNotification(notification), notification.timeout);
        }
    }

}
