import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]' // Use this directive on elements that should have dropdown functionality
})
export class DropdownDirective {

    @Input() collapseTarget: string | undefined;
    isOpen = false;
    isCollapseOpen = false;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    @HostListener('click', ['$event']) navToggler(event: Event) {
        console.log('Dropdown toggled');
        event.preventDefault(); // Prevent default action of the click event
        const target = event.target as HTMLElement;
        this.dropdownToggler(target);
        this.collapseToggler(target)
    }

    dropdownToggler(target: HTMLElement) {
        if (target.classList.contains('dropdown-toggle')) {
            this.isOpen = !this.isOpen;
            const dropdown = this.elementRef.nativeElement.querySelector('.dropdown');
            const dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
            if (this.isOpen) {
                this.renderer.addClass(dropdown, 'show');
                this.renderer.addClass(dropdownMenu, 'show');
                this.renderer.setAttribute(target, 'aria-expanded', 'true');
            } else {
                this.renderer.removeClass(dropdown, 'show');
                this.renderer.removeClass(dropdownMenu, 'show');
                this.renderer.setAttribute(target, 'aria-expanded', 'false');
            }
        }
    }

    collapseToggler(target: HTMLElement) {
        if (target.classList.contains('navbar-toggler') || (target.parentElement as HTMLElement).classList.contains('navbar-toggler')) {
            this.isCollapseOpen = !this.isCollapseOpen;
            const collapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');
            if (this.isCollapseOpen) {
                this.renderer.addClass(collapse, 'show');
                this.renderer.setAttribute(target, 'aria-expanded', 'true');
            } else {
                this.renderer.removeClass(collapse, 'show');
                this.renderer.setAttribute(target, 'aria-expanded', 'false');
            }
        }
    }

    @HostListener('document:click', ['$event'])
    close(event: Event) {
        event.preventDefault();
        
        if (!this.elementRef.nativeElement.contains(event.target)) { 
            this.closeDropdown();
            this.closeCollapseDropdown();
        }
    }

    closeDropdown() {
        if (this.isOpen) {
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

    closeCollapseDropdown() {
        if (this.isCollapseOpen) {
            this.isCollapseOpen = false;
            const collapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');
            const toggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
            if (collapse) {
                this.renderer.removeClass(collapse, 'show');
                this.renderer.setAttribute(toggler, 'aria-expanded', 'false');
            }
        }
    }
}