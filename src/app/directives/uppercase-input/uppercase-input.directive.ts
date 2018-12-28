import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[uppercaseInput]'
})
export class UppercaseInputDirective {

  constructor(public model: NgControl) { }

  @HostListener('ngModelChange', ['$event']) onInputChange(event) {
    const newVal = event.toUpperCase();

    this.model.valueAccessor.writeValue(newVal);
  }
}
