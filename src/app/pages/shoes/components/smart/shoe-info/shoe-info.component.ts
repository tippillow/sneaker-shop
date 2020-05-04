import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IShoeItemInterface } from 'src/app/interfaces/shoe-item.interface';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
    selector: 'app-shoe-info',
    templateUrl: './shoe-info.component.html',
    styleUrls: ['./shoe-info.component.less'],
})

export class ShoeInfoComponent implements OnInit {

    @Input() shoe: IShoeItemInterface;
    @Input() isLoading = false;

    @Output() add = new EventEmitter<IShoeItemInterface>();

    public form: FormGroup;
    public message: string;

    constructor(private notificationService: NotificationService) { }

    ngOnInit() {
        this.form = this.constructFrom();
    }

    public showSuccessMessage(): void {
        this.notificationService.success('Успех', 'Товар успешно добавлен', 3000);
    }

    public showErrorMessage(): void {
        this.notificationService.error('Ошибка', 'Пожалуйста выберите размер', 3000);
    }

    public onAddClick(): void {
        if (this.form.valid) {
            this.shoe.size = this.form.value.size;
            this.shoe.id = Math.floor(Math.random() * 100);
            this.add.emit(this.shoe);
            this.showSuccessMessage();
        } else {
            this.showErrorMessage();
        }
    }

    private constructFrom(): FormGroup {
        return new FormGroup({
            size: new FormControl('', [Validators.required]),
        });
    }

}
