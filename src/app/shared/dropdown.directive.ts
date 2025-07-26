import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]',
    standalone: true
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
                if (this.isOpen) {
                    this.isOpen = false; // Close dropdown if it was open
                    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown');
                    const dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
                    this.renderer.removeClass(dropdown, 'show');
                    this.renderer.removeClass(dropdownMenu, 'show');
                    this.renderer.setAttribute(target, 'aria-expanded', 'false');
                }
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
        if (!this.elementRef.nativeElement.contains(event.target)) { 
            this.closeDropdown(event);
            this.closeCollapseDropdown(event);
        }
    }

    closeDropdown(event: Event) {
        if (this.isOpen) {
            event.preventDefault(); // Prevent default action of the click event
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

    closeCollapseDropdown(event: Event) {
        if (this.isCollapseOpen) {
            event.preventDefault(); // Prevent default action of the click event
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