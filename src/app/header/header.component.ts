import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
    @Output()
    pageChange = new EventEmitter<'recipe' | 'shopping'>();

    constructor() {}

    ngOnInit(): void {}


    changePage(content: 'recipe' | 'shopping') {
        this.pageChange.emit(content);
        console.log(`Page changed to: ${content}`);
    }
}
