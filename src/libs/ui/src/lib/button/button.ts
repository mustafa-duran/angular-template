import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { joinClasses } from '@core';

import { ButtonSize, SIZE } from './button-size';
import { ButtonVariant, VARIANT } from './button-variant';

const BASE =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

@Component({
  selector: 'ui-button',
  imports: [],
  host: {
    class: 'contents',
  },
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  readonly variant = input<ButtonVariant>('default');
  readonly size = input<ButtonSize>('default');
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly className = input<string>('', { alias: 'class' });

  protected readonly classes = computed(() =>
    joinClasses(BASE, VARIANT[this.variant()], SIZE[this.size()], this.className())
  );
}
