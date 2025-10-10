import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

type ColorType = 'error' | '';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[matButton]',
})
export class CustomColorDirective {
  color = input<ColorType>(undefined, { alias: 'matButtonColor' });

  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      if (this.color()) {
        this._renderer.addClass(this._elementRef, `btn-${this.color()}`);
      }
    });
  }
}
