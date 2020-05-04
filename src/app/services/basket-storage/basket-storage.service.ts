import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';
import { BackendService } from '../backend/backend.service';
import { ORDERS } from 'src/app/config/constants/url.constants';
import { IOrderInformationInterface } from 'src/app/interfaces/order-information.interface';

@Injectable({
    providedIn: 'root'
})
export class BasketStorageService {

    private _basketList$ = new BehaviorSubject<IShoeItemInterface[]>(JSON.parse(localStorage.basketList));

    constructor(private backendService: BackendService) { }

    public get basketList$(): Observable<IShoeItemInterface[]> {
        return this._basketList$.asObservable();
    }

    public get basketListLength(): number {
        return this._basketList$.value.length;
    }

    public addItem(item: IShoeItemInterface): void {
        const newBasketList = this._basketList$.value.slice();
        newBasketList.unshift(Object.assign({}, item));
        this._basketList$.next(newBasketList);
        this.setToLocaleStorage();
    }

    public deleteItem(id: number): void {
        const newBasketList = this._basketList$.value.filter((item: IShoeItemInterface) => item.id !== id);
        this._basketList$.next(newBasketList);
        this.setToLocaleStorage();
    }

    public postOrder$(orderInformation: IOrderInformationInterface): Observable<boolean> {
        const options = {
            items: this._basketList$.value,
            information: orderInformation,
        };

        return this.backendService.post$(ORDERS, options);
    }

    public clearBasketList(): void {
        localStorage.basketList = JSON.stringify([]);
        this._basketList$.next([]);
    }

    private setToLocaleStorage(): void {
        localStorage.setItem('basketList', JSON.stringify(this._basketList$.value));
    }
}
