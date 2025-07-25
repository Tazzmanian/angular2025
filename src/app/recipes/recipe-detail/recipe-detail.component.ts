import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  dropdownOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDropdown(event: MouseEvent) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

}
