import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { joinClasses } from '@core';

import { TextboxInputType } from './textbox-input-type';
import { TEXTBOX_SIZE, TextboxSize } from './textbox-size';
import { TEXTBOX_VARIANT, TextboxVariant } from './textbox-variant';

const BASE =
  'flex w-full min-w-0 rounded-md border border-input bg-transparent transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground';

const createTextboxId = (): string => `ui-textbox-${Math.random().toString(36).slice(2)}`;

@Component({
  selector: 'ui-textbox',
  imports: [],
  host: {
    class: 'contents',
  },
  templateUrl: './textbox.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: UiTextboxComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTextboxComponent implements ControlValueAccessor {
  private readonly internalId = createTextboxId();

  readonly variant = input<TextboxVariant>('default');
  readonly size = input<TextboxSize>('default');
  readonly type = input<TextboxInputType | null>(null);
  readonly className = input<string>('', { alias: 'class' });
  readonly placeholder = input<string | null>(null);
  readonly name = input<string | null>(null);
  readonly id = input<string | null>(null);
  readonly autocomplete = input<string | null>(null);
  readonly autocapitalize = input<string | null>(null);
  readonly autocorrect = input<string | null>(null);
  readonly inputmode = input<string | null>(null);
  readonly min = input<string | null>(null);
  readonly max = input<string | null>(null);
  readonly step = input<string | null>(null);
  readonly minlength = input<number | null>(null);
  readonly maxlength = input<number | null>(null);
  readonly pattern = input<string | null>(null);
  readonly accept = input<string | null>(null);
  readonly multiple = input(false, { transform: booleanAttribute });
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });
  readonly ariaDescribedby = input<string | null>(null, { alias: 'aria-describedby' });
  readonly ariaInvalid = input<string | null>(null, { alias: 'aria-invalid' });
  readonly autofocus = input(false, { transform: booleanAttribute });
  readonly required = input(false, { transform: booleanAttribute });
  readonly readonlyInput = input(false, { alias: 'readonly', transform: booleanAttribute });
  readonly disabledInput = input(false, { alias: 'disabled', transform: booleanAttribute });

  private readonly valueSignal = signal('');
  private readonly disabledFromControl = signal(false);

  protected readonly value = this.valueSignal.asReadonly();

  private onChange: (value: TextboxControlValue) => void = () => {};
  private onTouched: () => void = () => {};

  protected readonly config = computed(() => TEXTBOX_VARIANT[this.variant()]);

  protected readonly controlId = computed(() => this.id() ?? this.internalId);

  protected readonly resolvedType = computed<TextboxInputType>(
    () => this.type() ?? this.config().type
  );

  protected readonly resolvedPlaceholder = computed(() => {
    const manual = this.placeholder();
    if (manual !== null) {
      return manual;
    }
    return this.config().placeholder ?? null;
  });

  protected readonly classes = computed(() =>
    joinClasses(BASE, TEXTBOX_SIZE[this.size()], this.config().className ?? null, this.className())
  );

  protected readonly isFile = computed(() => this.resolvedType() === 'file');

  protected readonly isDisabled = computed(
    () => this.disabledInput() || this.disabledFromControl() || this.config().disabled === true
  );

  protected readonly isReadonly = computed(() => this.readonlyInput());

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    if (this.isFile()) {
      const files = target.files;
      this.valueSignal.set('');
      this.onChange(files && files.length > 0 ? files : null);
      return;
    }

    const nextValue = target.value;
    this.valueSignal.set(nextValue);
    this.onChange(nextValue);
  }

  handleBlur(): void {
    this.onTouched();
  }

  writeValue(value: unknown): void {
    if (value instanceof FileList) {
      this.valueSignal.set('');
      return;
    }

    if (typeof value === 'string') {
      this.valueSignal.set(value);
      return;
    }

    if (value === null || value === undefined) {
      this.valueSignal.set('');
      return;
    }

    this.valueSignal.set(String(value));
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = (value) => fn(value);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledFromControl.set(isDisabled);
  }
}

export type TextboxControlValue = string | FileList | null;
