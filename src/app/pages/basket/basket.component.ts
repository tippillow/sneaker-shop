import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasketStorageService } from 'src/app/services/basket-storage/basket-storage.service';
import { Observable, Subject } from 'rxjs';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';
import { IOrderInformationInterface } from 'src/app/interfaces/order-information.interface';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.less']
})
export class BasketComponent implements OnInit, OnDestroy {

    public basketList$: Observable<IShoeItemInterface[]>;

    private destroy$: Subject<boolean> = new Subject<boolean>();


    constructor(
        private basketStorageService: BasketStorageService,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.basketList$ = this.basketStorageService.basketList$;
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    public onDelete(id: number): void {
        this.basketStorageService.deleteItem(id);
    }

    public onSubmit(form: FormGroup): void {
        if (form.valid && this.basketStorageService.basketListLength) {
            this.basketStorageService.postOrder$(form.value)
                .pipe(
                    takeUntil(this.destroy$))
                .subscribe(() => {
                  this.notificationService.success('Успех', 'Заказ отправлен', 3000),
                  this.basketStorageService.clearBasketList();
                });
        } else {
            if (form.invalid) {
                this.notificationService.error('Ошибка', 'Пожалуйста, заполните форму', 3000);
            }

            if (!this.basketStorageService.basketListLength) {
                this.notificationService.error('Ошибка', 'Ваша корзина пуста', 3000);
            }
        }
    }
}
