import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent implements OnInit {

    @Input() isLogged: boolean;
    @Output() logout: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }


    public onLogout(): void {
        this.logout.emit();
    }

}
