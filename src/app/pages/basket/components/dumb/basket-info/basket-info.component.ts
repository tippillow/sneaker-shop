import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';

@Component({
    selector: 'app-basket-info',
    templateUrl: './basket-info.component.html',
    styleUrls: ['./basket-info.component.less']
})
export class BasketInfoComponent implements OnInit, OnChanges {

    @Input() basketItems: IShoeItemInterface[];

    @Output() delete: EventEmitter<number> = new EventEmitter<number>();

    public totalPrice: number;

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges() {
        this.totalPrice = this.basketItems.length ? this.basketItems
            .map((item: IShoeItemInterface) => {
                return parseInt(item.price);
            })
            .reduce((previous: number, current: number) => {

                return previous + current;
            }) : 0;
    }

    public onDeleteClick(item: IShoeItemInterface): void {
        this.delete.emit(item.id);
    }

}
