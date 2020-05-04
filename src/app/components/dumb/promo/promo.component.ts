import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-promo',
    templateUrl: './promo.component.html',
    styleUrls: ['./promo.component.less']
})
export class PromoComponent implements OnInit {

    @Input() photos: string[];

    constructor() { }

    ngOnInit() {
    }

}
