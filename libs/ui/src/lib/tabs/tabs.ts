import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  signal
} from '@angular/core';
import type { TabsTrigger } from './parts/trigger';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()'
  }
})
export class Tabs {
  private static nextId = 0;

  readonly class = input<string>('');
  readonly value = model<string | null>(null);
  readonly defaultValue = input<string | null>(null);

  private readonly internalValue = signal<string | null>(null);
  private readonly registeredValues = signal<ReadonlyArray<string>>([]);
  private readonly triggerRegistry = new Map<string, TabsTrigger>();

  readonly hostClasses = computed(() => {
    const custom = this.class().trim();
    return custom ? `block ${custom}` : 'block';
  });

  readonly instanceId = `tabs-${++Tabs.nextId}`;

  constructor() {
    effect(() => {
      const external = this.value();
      const values = this.registeredValues();
      if (external !== null && values.includes(external)) {
        this.internalValue.set(external);
      }
    });

    effect(() => {
      const values = this.registeredValues();
      const external = this.value();

      if (!values.length) {
        this.internalValue.set(null);
        return;
      }

      if (external !== null && values.includes(external)) {
        return;
      }

      const current = this.internalValue();
      if (current !== null && values.includes(current)) {
        return;
      }

      const defaultValue = this.defaultValue();
      if (defaultValue !== null && values.includes(defaultValue)) {
        this.internalValue.set(defaultValue);
        this.value.set(defaultValue);
        return;
      }

      const first = values[0];
      this.internalValue.set(first);
      this.value.set(first);
    });

    effect(() => {
      const active = this.internalValue();
      if (!active) {
        return;
      }

      const trigger = this.triggerRegistry.get(active);
      if (trigger && trigger.disabled()) {
        this.focusNext(active);
      }
    });
  }

  registerTrigger(trigger: TabsTrigger): void {
    const value = trigger.value();
    if (!value) {
      return;
    }

    this.triggerRegistry.set(value, trigger);

    this.registeredValues.update((existing) =>
      existing.includes(value) ? existing : [...existing, value]
    );
  }

  unregisterTrigger(value: string): void {
    this.triggerRegistry.delete(value);

    let updated: ReadonlyArray<string> = [];
    this.registeredValues.update((existing) => {
      updated = existing.filter((item) => item !== value);
      return updated;
    });
    if (this.internalValue() === value) {
      if (updated.length) {
        const nextValue = updated[0];
        this.internalValue.set(nextValue);
        this.value.set(nextValue);
      } else {
        this.internalValue.set(null);
        this.value.set(null);
      }
    }
  }

  selectTab(value: string): void {
    const trigger = this.triggerRegistry.get(value);
    if (!trigger || trigger.disabled()) {
      return;
    }

    this.internalValue.set(value);
    this.value.set(value);
  }

  isActive(value: string): boolean {
    return this.internalValue() === value;
  }

  focusNext(value: string): void {
    this.focusRelative(value, 1);
  }

  focusPrevious(value: string): void {
    this.focusRelative(value, -1);
  }

  focusFirst(): void {
    const values = this.registeredValues();
    if (!values.length) {
      return;
    }

    this.focusOn(values[0]);
  }

  focusLast(): void {
    const values = this.registeredValues();
    if (!values.length) {
      return;
    }

    this.focusOn(values[values.length - 1]);
  }

  getTriggerId(value: string): string {
    return `${this.instanceId}-trigger-${this.slugify(value)}`;
  }

  getContentId(value: string): string {
    return `${this.instanceId}-content-${this.slugify(value)}`;
  }

  private focusRelative(currentValue: string, delta: 1 | -1): void {
    const values = this.registeredValues();
    if (!values.length) {
      return;
    }

    let index = values.indexOf(currentValue);
    if (index === -1) {
      index = delta === 1 ? -1 : 0;
    }

    for (let step = 0; step < values.length; step += 1) {
      index = (index + delta + values.length) % values.length;
      const candidate = values[index];
      const trigger = this.triggerRegistry.get(candidate);

      if (trigger && !trigger.disabled()) {
        this.focusOn(candidate);
        return;
      }
    }
  }

  private focusOn(value: string): void {
    const trigger = this.triggerRegistry.get(value);
    if (!trigger || trigger.disabled()) {
      return;
    }

    this.selectTab(value);
    trigger.focus();
  }

  private slugify(value: string): string {
    return value
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
}
