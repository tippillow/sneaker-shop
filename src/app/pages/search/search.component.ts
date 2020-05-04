import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchService } from 'src/app/services/search/search.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

const ENTER_CODE = 'Enter';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

    @ViewChild('title') title: ElementRef;

    public searchingItems$: Observable<any[]>;
    public error$: Observable<string>;

    constructor(
        private searchService: SearchService,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.searchingItems$ = this.searchService.searchingItems$;
        this.error$ = this.searchService.error$;
    }

    public onInputSubmit(searchingString: string): void {
        if (searchingString) {
            this.searchService.search$(searchingString.split(' ').join('')).subscribe();
            this.changeTitle(searchingString);
        } else {
            this.notificationService.error('Ошибка', 'Введите то, что вы хотите найти', 3000);
        }
    }

    private changeTitle(searchingString: string) {
        this.title.nativeElement.textContent = `Поиск по результату: ${searchingString}`;
    }

}
