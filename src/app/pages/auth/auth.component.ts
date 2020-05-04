import { Component, OnInit, OnDestroy } from '@angular/core';
import { REGISTER, LOGIN } from 'src/app/config/constants/url.constants';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ICredentialsInterface } from 'src/app/interfaces/credentials.interface';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PathConfig } from 'src/app/config/routing/path.config';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.less']
})
export class AuthComponent implements OnInit, OnDestroy {

    public errorMessage$: Observable<string>;

    private destroy$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private authService: AuthService,
        private router: Router,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.authService.errorMessage$.pipe(
            takeUntil(this.destroy$),
        ).subscribe((message: string) => this.notificationService.error('Ошибка', message, 3000));

        if (this.authService.authData) {
            this.router.navigate([PathConfig.MAIN]);
        }
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    public login(credntials: ICredentialsInterface): void {
        if (credntials.repeatPassword) {
            this.authService.login$(REGISTER, credntials).subscribe();
            return;
        }
        this.authService.login$(LOGIN, credntials).subscribe();
    }

}
