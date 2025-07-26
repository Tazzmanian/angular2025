import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DropdownDirective } from '../shared/dropdown.directive';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: true,
    imports: [RouterLink, DropdownDirective]
})
export class HeaderComponent implements OnInit {
    pageChange = output<'recipe' | 'shopping'>();

    ngOnInit(): void {}


    changePage(content: 'recipe' | 'shopping') {
        this.pageChange.emit(content);
        console.log(`Page changed to: ${content}`);
    }
}
