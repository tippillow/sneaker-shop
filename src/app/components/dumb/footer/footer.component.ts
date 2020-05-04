import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

    public icons = ['https://image.flaticon.com/icons/svg/1051/1051248.svg', 'https://image.flaticon.com/icons/svg/733/733558.svg', 'https://image.flaticon.com/icons/svg/733/733583.svg'];

    constructor() { }

    ngOnInit() {
    }

}
