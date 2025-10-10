import { computed, Directive, effect, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMarginBottom]',
})
export class MarginBottomDirective {
  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer = inject(Renderer2);

  marginBottom = input('24px', {
    transform: (value: string) => value || '24px',
  });

  resolvedMarginBottom = computed(() => this.marginBottom() || '24px');

  constructor() {
    effect(() => {
      if (this.resolvedMarginBottom()) {
        this._renderer.setStyle(this._elementRef, 'margin-bottom', this.resolvedMarginBottom());
      }
    });
  }
}
