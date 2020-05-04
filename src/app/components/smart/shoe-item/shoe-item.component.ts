import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';

@Component({
    selector: 'app-shoe-item',
    templateUrl: './shoe-item.component.html',
    styleUrls: ['./shoe-item.component.less']
})
export class ShoeItemComponent implements OnInit {

    @Input() items: IShoeItemInterface[];

    constructor(private router: Router) { }

    ngOnInit() {
    }

    public onItemClick(model: string) {
        this.router.navigate([`shoes/shoe/${model.split(' ').join('')}`]);
    }

}
