import { Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarginBottom]',
})
export class MarginBottomDirective {
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  appMarginBottom = input('24px', {
    transform: (value: string) => value || '24px',
  });

  constructor() {
    effect(() => {
      if (this.appMarginBottom()) {
        this._renderer.setStyle(this._elementRef, 'margin-bottom', this.appMarginBottom());
      }
    });
  }
}
