import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  signal,
  ViewChild
} from '@angular/core';
import { TABS_CONTENT_CLASSES, TABS_LIST_CLASSES, TABS_TRIGGER_CLASSES } from './tabs.constants';

@Component({
  selector: 'ui-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()'
  }
})
export class TabsComponent {
  private static nextId = 0;

  readonly class = input<string>('');
  readonly value = model<string | null>(null);
  readonly defaultValue = input<string | null>(null);

  private readonly internalValue = signal<string | null>(null);
  private readonly registeredValues = signal<ReadonlyArray<string>>([]);
  private readonly triggerRegistry = new Map<string, TabsTriggerComponent>();

  readonly hostClasses = computed(() => {
    const custom = this.class().trim();
    return custom ? `block ${custom}` : 'block';
  });

  readonly instanceId = `ui-tabs-${++TabsComponent.nextId}`;

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

  registerTrigger(trigger: TabsTriggerComponent): void {
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

@Component({
  selector: 'ui-tabs-list',
  standalone: true,
  template: `
    <div role="tablist" [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsListComponent {
  private readonly tabs = inject(TabsComponent);

  readonly class = input<string>('');
  readonly classes = computed(() => {
    const custom = this.class().trim();
    return custom ? `${TABS_LIST_CLASSES} ${custom}` : TABS_LIST_CLASSES;
  });
}

@Component({
  selector: 'ui-tabs-trigger',
  standalone: true,
  template: `
    <button
      #button
      type="button"
      role="tab"
      [id]="triggerId()"
      [attr.aria-selected]="isActive()"
      [attr.aria-controls]="contentId()"
      [attr.data-state]="dataState()"
      [attr.disabled]="disabled() ? '' : null"
      [class]="classes()"
      (click)="onClick()"
      (keydown)="onKeydown($event)"
    >
      <ng-content />
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsTriggerComponent implements OnDestroy {
  private readonly tabs = inject(TabsComponent);

  readonly value = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly class = input<string>('');

  @ViewChild('button', { static: true }) private readonly button?: ElementRef<HTMLButtonElement>;

  private registeredValue: string | null = null;

  readonly classes = computed(() => {
    const custom = this.class().trim();
    return custom ? `${TABS_TRIGGER_CLASSES} ${custom}` : TABS_TRIGGER_CLASSES;
  });

  readonly dataState = computed(() => (this.tabs.isActive(this.value()) ? 'active' : 'inactive'));
  readonly isActive = computed(() => this.dataState() === 'active');
  readonly triggerId = computed(() => this.tabs.getTriggerId(this.value()));
  readonly contentId = computed(() => this.tabs.getContentId(this.value()));

  constructor() {
    effect(() => {
      const value = this.value();
      if (!value) {
        return;
      }

      if (this.registeredValue === value) {
        return;
      }

      if (this.registeredValue) {
        this.tabs.unregisterTrigger(this.registeredValue);
      }

      this.tabs.registerTrigger(this);
      this.registeredValue = value;
    });

    queueMicrotask(() => {
      if (!this.value()) {
        throw new Error('ui-tabs-trigger requires a non-empty "value" input.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.registeredValue) {
      this.tabs.unregisterTrigger(this.registeredValue);
      this.registeredValue = null;
    }
  }

  focus(): void {
    this.button?.nativeElement.focus({ preventScroll: true });
  }

  onClick(): void {
    if (this.disabled()) {
      return;
    }

    this.tabs.selectTab(this.value());
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }

    const key = event.key;

    if (key === 'Home') {
      event.preventDefault();
      this.tabs.focusFirst();
      return;
    }

    if (key === 'End') {
      event.preventDefault();
      this.tabs.focusLast();
      return;
    }

    if (key === 'ArrowRight') {
      event.preventDefault();
      this.tabs.focusNext(this.value());
      return;
    }

    if (key === 'ArrowLeft') {
      event.preventDefault();
      this.tabs.focusPrevious(this.value());
    }
  }
}

@Component({
  selector: 'ui-tabs-content',
  standalone: true,
  template: `
    <section
      role="tabpanel"
      [id]="contentId()"
      [attr.aria-labelledby]="triggerId()"
      [attr.data-state]="dataState()"
      [attr.hidden]="isActive() ? null : ''"
      [attr.aria-hidden]="isActive() ? 'false' : 'true'"
      [class]="classes()"
    >
      <ng-content />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsContentComponent {
  private readonly tabs = inject(TabsComponent);

  readonly value = input<string>('');
  readonly class = input<string>('');

  readonly classes = computed(() => {
    const custom = this.class().trim();
    return custom ? `${TABS_CONTENT_CLASSES} ${custom}` : TABS_CONTENT_CLASSES;
  });

  readonly dataState = computed(() => (this.tabs.isActive(this.value()) ? 'active' : 'inactive'));
  readonly isActive = computed(() => this.dataState() === 'active');
  readonly triggerId = computed(() => this.tabs.getTriggerId(this.value()));
  readonly contentId = computed(() => this.tabs.getContentId(this.value()));

  constructor() {
    queueMicrotask(() => {
      if (!this.value()) {
        throw new Error('ui-tabs-content requires a matching "value" input.');
      }
    });
  }
}
