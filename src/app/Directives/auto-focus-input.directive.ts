import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutoFocusInput]'
})
export class AutoFocusInputDirective {

  constructor(private el: ElementRef) {
    setTimeout(() => {
      this.el.nativeElement.focus();
    })
  }

}
