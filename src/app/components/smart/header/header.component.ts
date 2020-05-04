import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

    public isLogged$: Observable<boolean>;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.isLogged$ = this.authService.isLogged$;
    }

    public onLogout(): void {
        this.authService.logout();
    }

}
