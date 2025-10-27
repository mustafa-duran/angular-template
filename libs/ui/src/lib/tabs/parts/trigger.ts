import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Tabs } from '../tabs';
import { TABS_TRIGGER_CLASSES } from '../tabs.constants';

@Component({
  selector: 'tabs-trigger',
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
export class TabsTrigger implements OnDestroy {
  private readonly tabs = inject(Tabs);

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
        throw new Error('tabs-trigger requires a non-empty "value" input.');
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
