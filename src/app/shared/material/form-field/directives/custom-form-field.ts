import { Directive } from '@angular/core';
import { FullWidthDirective } from './full-width';
import { MarginBottomDirective } from './margin-bottom';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[mat-form-field]',
  hostDirectives: [
    {
      directive: FullWidthDirective,
      inputs: ['appFullWidth'],
    },
    {
      directive: MarginBottomDirective,
      inputs: ['marginBottom'],
    },
  ],
})
export class CustomFormFieldDirective {}
