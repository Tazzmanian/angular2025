import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appCollapse]' // Use this directive on elements that should have dropdown functionality
})
export class CollapseDirective {

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    isOpen = false;

    @HostListener('click', ['$event']) collapseToggler(event: Event) {
        console.log('Collapse toggled');
        event.preventDefault(); // Prevent default action of the click event
        this.isOpen = !this.isOpen;
        const toggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
        const collapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');
        if (toggler) {
            if (this.isOpen) {
                this.renderer.addClass(collapse, 'show');
                this.renderer.setAttribute(toggler, 'aria-expanded', 'true');
            } else {
                this.renderer.removeClass(collapse, 'show');
                this.renderer.setAttribute(toggler, 'aria-expanded', 'false');
            }
        }
    }

    @HostListener('document:click', ['$event'])
    closeCollapseDropdown(event: Event) {
        if (!this.elementRef.nativeElement.contains(event.target)) {
            this.isOpen = false;
            const toggler = this.elementRef.nativeElement.querySelector('.navbar-toggler');
            const collapse = this.elementRef.nativeElement.querySelector('.navbar-collapse');
            if (toggler) {
                this.renderer.removeClass(collapse, 'show');
                this.renderer.setAttribute(toggler, 'aria-expanded', 'false');
            }
        }
    }
}