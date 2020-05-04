import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-promo-item',
    templateUrl: './promo-item.component.html',
    styleUrls: ['./promo-item.component.less']
})
export class PromoItemComponent implements OnInit {

    @Input() photos: string[];

    constructor() { }

    ngOnInit() {
    }

}
