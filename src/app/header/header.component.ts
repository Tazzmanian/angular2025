import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Output()
    pageChange = new EventEmitter<'recipe' | 'shopping'>();

    dropdownOpen = false;

    constructor() {}

    ngOnInit(): void {}

    toggleDropdown(event: MouseEvent) {
        event.preventDefault();
        this.dropdownOpen = !this.dropdownOpen;
    }

    changePage(content: 'recipe' | 'shopping') {
        this.pageChange.emit(content);
        console.log(`Page changed to: ${content}`);
        this.dropdownOpen = false; // Close dropdown after page change
    }
}
