import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';

import { joinClasses } from '@core';
import { UiButtonComponent } from '../button';
import { NAVIGATION_MENU_CLASSES } from './navigation-menu-classes';
import { NavigationMenuChild, NavigationMenuItem } from './navigation-menu-types';

@Component({
  selector: 'ui-navigation-menu',
  imports: [UiButtonComponent],
  templateUrl: './navigation-menu.html',
  host: {
    class: 'contents',
    '(mouseleave)': 'handleHostMouseLeave()',
    '(focusout)': 'handleFocusOut($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiNavigationMenuComponent {
  private readonly hostRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private readonly idPrefix = `ui-navigation-${Math.random().toString(36).slice(2)}`;

  readonly items = input<ReadonlyArray<NavigationMenuItem>>([]);
  readonly className = input<string>('', { alias: 'class' });
  readonly ariaLabel = input<string>('Main menu', { alias: 'aria-label' });

  private readonly activeIndexSignal = signal<number | null>(null);

  protected readonly activeIndex = this.activeIndexSignal.asReadonly();

  protected readonly rootClasses = computed(() =>
    joinClasses(NAVIGATION_MENU_CLASSES.root, this.className())
  );
  protected readonly listClasses = computed(() => NAVIGATION_MENU_CLASSES.list);
  protected readonly itemClasses = computed(() => NAVIGATION_MENU_CLASSES.item);
  protected readonly triggerVariant: 'ghost' = 'ghost';
  protected readonly linkClasses = computed(() => NAVIGATION_MENU_CLASSES.link);
  protected readonly indicatorClasses = computed(() => NAVIGATION_MENU_CLASSES.indicator.container);
  protected readonly indicatorShapeClasses = computed(
    () => NAVIGATION_MENU_CLASSES.indicator.shape
  );
  protected readonly viewportWrapperClasses = computed(
    () => NAVIGATION_MENU_CLASSES.viewportWrapper
  );
  protected readonly viewportClasses = computed(() => NAVIGATION_MENU_CLASSES.viewport);
  protected readonly contentClasses = computed(() => NAVIGATION_MENU_CLASSES.content);
  protected readonly dropdownLinkClasses = computed(() => NAVIGATION_MENU_CLASSES.dropdown.link);
  protected readonly dropdownLabelClasses = computed(() => NAVIGATION_MENU_CLASSES.dropdown.label);
  protected readonly dropdownDescriptionClasses = computed(
    () => NAVIGATION_MENU_CLASSES.dropdown.description
  );

  protected readonly activeItem = computed(() => {
    const index = this.activeIndexSignal();
    const entries = this.items();
    if (index === null || index < 0 || index >= entries.length) {
      return null;
    }
    return entries[index] ?? null;
  });

  protected readonly activeChildren = computed(() => this.activeItem()?.children ?? null);

  protected readonly hasActiveDropdown = computed(() => (this.activeChildren()?.length ?? 0) > 0);

  protected readonly indicatorState = computed(() =>
    this.hasActiveDropdown() ? 'visible' : 'hidden'
  );
  protected readonly viewportState = computed(() => (this.hasActiveDropdown() ? 'open' : 'closed'));

  protected readonly viewportId = computed(() => {
    const index = this.activeIndexSignal();
    if (index === null) {
      return null;
    }
    return this.resolvePanelId(index);
  });

  protected readonly viewportLabelId = computed(() => {
    const index = this.activeIndexSignal();
    if (index === null) {
      return null;
    }
    return this.resolveTriggerId(index);
  });

  protected readonly trackItem = (index: number, item: NavigationMenuItem) =>
    item.id ?? `${item.label}-${index}`;

  protected readonly trackChild = (index: number, child: NavigationMenuChild) =>
    child.id ?? `${child.label}-${index}`;

  protected resolveTriggerId(index: number): string {
    return `${this.idPrefix}-trigger-${index}`;
  }

  protected resolvePanelId(index: number): string {
    return `${this.idPrefix}-panel-${index}`;
  }

  protected resolveTriggerClasses(index: number): string {
    const isActive = this.activeIndexSignal() === index;
    return joinClasses(
      NAVIGATION_MENU_CLASSES.trigger.base,
      isActive ? NAVIGATION_MENU_CLASSES.trigger.open : null
    );
  }

  protected openDropdown(index: number): void {
    if (!this.hasChildrenAt(index)) {
      return;
    }
    this.activeIndexSignal.set(index);
  }

  protected toggleDropdown(index: number): void {
    if (!this.hasChildrenAt(index)) {
      return;
    }

    this.activeIndexSignal.update((current) => (current === index ? null : index));
  }

  protected closeAll(): void {
    this.activeIndexSignal.set(null);
  }

  protected handleHostMouseLeave(): void {
    this.closeAll();
  }

  protected handleViewportLeave(): void {
    this.closeAll();
  }

  protected handleFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next) {
      this.closeAll();
      return;
    }

    if (!this.hostRef.nativeElement.contains(next)) {
      this.closeAll();
    }
  }

  protected handleLinkInteraction(): void {
    this.closeAll();
  }

  private hasChildrenAt(index: number): boolean {
    const entry = this.items()[index];
    return !!(entry && entry.children && entry.children.length > 0);
  }
}
