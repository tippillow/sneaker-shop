import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {IRecommendedItemInterface} from '../../../../../../interfaces/recomended-item.interface';

@Component({
    selector: 'app-recommended-item',
    templateUrl: './recommended-item.component.html',
    styleUrls: ['./recommended-item.component.less']
})
export class RecommendedItemComponent implements OnInit {

    @Input() items: IRecommendedItemInterface[];

    constructor(private router: Router) { }

    ngOnInit() {
    }

    public onItemClick(model: string): void {
        this.router.navigate([`shoes/shoe/${model.split(' ').join('')}`]);
    }

}
