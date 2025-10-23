import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {
  BUTTON_BASE_CLASSES,
  BUTTON_DEFAULT_SIZE,
  BUTTON_DEFAULT_VARIANT,
  BUTTON_SIZE_CLASSES,
  BUTTON_VARIANT_CLASSES
} from './button.constants';
import { ButtonSize, ButtonVariant } from './button.types';

@Component({
  selector: 'ui-button',
  imports: [],
  templateUrl: './button.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'computedClass()',
    '[attr.type]': 'type()',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled()'
  }
})
export class ButtonComponent {
  variant = input<ButtonVariant>(BUTTON_DEFAULT_VARIANT);
  size = input<ButtonSize>(BUTTON_DEFAULT_SIZE);
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  class = input<string>('');

  computedClass = computed(() => {
    const variantClass = BUTTON_VARIANT_CLASSES[this.variant()];
    const sizeClass = BUTTON_SIZE_CLASSES[this.size()];
    const customClass = this.class();

    return `${BUTTON_BASE_CLASSES} ${variantClass} ${sizeClass} ${customClass}`.trim();
  });
}
