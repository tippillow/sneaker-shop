import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
    public title = 'sneakerShop';

    ngOnInit() {
        if (!localStorage.basketList) {
            localStorage.setItem('basketList', JSON.stringify([]));
        }

        if (!localStorage.authData) {
            localStorage.setItem('authData', null);
        }
    }
}
