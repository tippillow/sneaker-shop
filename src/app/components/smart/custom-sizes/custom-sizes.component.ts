import { Component, OnInit, Input, forwardRef, ViewChildren, QueryList, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-custom-sizes',
    templateUrl: './custom-sizes.component.html',
    styleUrls: ['./custom-sizes.component.less'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomSizesComponent),
            multi: true
        }
    ]
})
export class CustomSizesComponent implements OnInit, ControlValueAccessor {

    @Input() sizes: string[];
    @ViewChildren('size') sizesList: QueryList<ElementRef>;

    public value: string;
    public onChange: (value: string) => void;
    public onTouched: () => void;

    constructor(private renderer: Renderer2) { }

    ngOnInit() { }

    public writeValue(value: string): void {
        this.value = value ? value : '';
    }

    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    public onSizeCLick(element: any) {
        this.onChange(element.target.textContent);
        this.sizesList.forEach((size: ElementRef) => {
            this.renderer.removeClass(size.nativeElement, 'size--selected');
        });
        this.renderer.addClass(element.target, 'size--selected');
    }

}
