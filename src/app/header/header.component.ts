import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  dropdownOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown(event: MouseEvent) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

}
