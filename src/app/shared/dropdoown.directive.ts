import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]' // Use this directive on elements that should have dropdown functionality
})
export class DropdownDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    isOpen = false;

    @HostListener('click', ['$event']) navToggler(event: Event) {
        console.log('Dropdown toggled');
        event.preventDefault(); // Prevent default action of the click event
        this.isOpen = !this.isOpen;
        const dropdown = this.elementRef.nativeElement.querySelector('.dropdown');
        const dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
        const toggle = this.elementRef.nativeElement.querySelector('.dropdown-toggle');
        if (dropdown) {
            if (this.isOpen) {
                this.renderer.addClass(dropdown, 'show');
                this.renderer.addClass(dropdownMenu, 'show');
                this.renderer.setAttribute(toggle, 'aria-expanded', 'true');
            } else {
                this.renderer.removeClass(dropdown, 'show');
                this.renderer.removeClass(dropdownMenu, 'show');
                this.renderer.setAttribute(toggle, 'aria-expanded', 'false');
            }
        }
    }

    @HostListener('document:click', ['$event'])
    closeNavDropdown(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
            const dropdown = this.elementRef.nativeElement.querySelector('.dropdown');
            const dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
            const toggle = this.elementRef.nativeElement.querySelector('.dropdown-toggle');
            if (dropdownMenu) {
                this.renderer.removeClass(dropdown, 'show');
                this.renderer.removeClass(dropdownMenu, 'show');
                this.renderer.setAttribute(toggle, 'aria-expanded', 'false');
            }
        }
    }
}