import { Component, OnInit, Input } from '@angular/core';
import { IRecommendedItemInterface } from 'src/app/interfaces/recomended-item.interface';

@Component({
    selector: 'app-recommended',
    templateUrl: './recommended.component.html',
    styleUrls: ['./recommended.component.less']
})
export class RecommendedComponent implements OnInit {

    @Input() items: IRecommendedItemInterface[];

    constructor() { }

    ngOnInit() {
    }

}
