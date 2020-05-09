import {Component, ElementRef, forwardRef, Input, OnInit, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'app-custom-select',
    templateUrl: './custom-select.component.html',
    styleUrls: ['./custom-select.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomSelectComponent),
            multi: true
        }
    ]
})
export class CustomSelectComponent implements OnInit, ControlValueAccessor {

    @Input() options: string[];
    @Input() labelText: string;

    @ViewChild('label') label: ElementRef;

    public isOpen = false;
    public value: string;
    public onChange: (value: string) => void;
    public onTouched: () => void;

    constructor() {
    }

    ngOnInit(): void {
    }

    public writeValue(value: string): void {
        this.value = value ? value : '';
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public changeOpenStatus(): void {
        this.isOpen = !this.isOpen;
    }

    public onOptionSelect(optionValue: string): void {
        this.onChange(optionValue);
        this.label.nativeElement.textContent = optionValue;
        this.changeOpenStatus();
    }

}
