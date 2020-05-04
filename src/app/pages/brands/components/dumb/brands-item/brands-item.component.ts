import { Component, OnInit, Input } from '@angular/core';
import { IBrandItemInterface } from 'src/app/interfaces/brand-item.interface';
import { Router } from '@angular/router';

@Component({
    selector: 'app-brands-item',
    templateUrl: './brands-item.component.html',
    styleUrls: ['./brands-item.component.less']
})
export class BrandsItemComponent implements OnInit {

   @Input() items: IBrandItemInterface[];

    constructor(private router: Router) { }

    ngOnInit() {
    }

    public onBrandClick(brand: string): void {
        this.router.navigate([`brands/brand/${brand}`]);
    }

}
