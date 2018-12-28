import { UppercaseInputDirective } from './uppercase-input.directive';
import { NgControl } from '@angular/forms';

describe('UppercaseInputDirective', () => {
  it('should create an instance', () => {
    const model: NgControl = null;
    const directive = new UppercaseInputDirective(model);
    expect(directive).toBeTruthy();
  });
});
