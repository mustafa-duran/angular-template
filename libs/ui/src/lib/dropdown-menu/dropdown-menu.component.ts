import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  input,
  model,
  Output,
  QueryList,
  signal,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {
  DropdownMenuAlign,
  DropdownMenuItem,
  DropdownMenuSection,
  DropdownMenuSide
} from './dropdown-menu.types';

@Component({
  selector: 'ui-dropdown-menu',
  imports: [],
  templateUrl: './dropdown-menu.html',
  styles: [
    `
      @keyframes dropdown-menu-enter {
        from {
          opacity: 0;
          transform: translateY(-6px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      :host([data-state='open']) [data-dropdown-menu-content] {
        animation: dropdown-menu-enter 130ms cubic-bezier(0.16, 1, 0.3, 1) both;
      }

      :host([data-state='open']) [data-dropdown-menu-item] {
        cursor: pointer;
        transition:
          background-color 160ms ease,
          color 160ms ease;
      }

      :host([data-state='open']) [data-dropdown-menu-item][disabled] {
        cursor: not-allowed;
      }

      :host([data-state='open']) [data-dropdown-menu-item]:hover:not([disabled]),
      :host([data-state='open']) [data-dropdown-menu-item]:focus-visible:not([disabled]) {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
      }

      :host([data-state='open'])
        [data-dropdown-menu-item][data-destructive='true']:hover:not([disabled]),
      :host([data-state='open'])
        [data-dropdown-menu-item][data-destructive='true']:focus-visible:not([disabled]) {
        background-color: hsl(var(--destructive) / 0.12);
        color: hsl(var(--destructive));
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[attr.data-state]': 'menuState()',
    '[attr.data-side]': 'resolvedSide()'
  }
})
export class DropdownMenuComponent {
  private readonly hostRef = inject(ElementRef<HTMLElement>);

  sections = input<ReadonlyArray<DropdownMenuSection>>([]);
  triggerLabel = input<string>('Open');
  disabled = input<boolean>(false);
  align = input<DropdownMenuAlign>('start');
  side = input<DropdownMenuSide>('bottom');
  sideOffset = input<number>(8);
  menuWidth = input<string>('14rem');
  closeOnSelect = input<boolean>(true);
  class = input<string>('');

  open = model<boolean>(false);

  @Output() readonly itemSelected = new EventEmitter<DropdownMenuItem>();

  @ViewChildren('menuButton') private readonly menuButtons?: QueryList<
    ElementRef<HTMLButtonElement>
  >;
  @ViewChild('triggerButton') private readonly triggerButton?: ElementRef<HTMLButtonElement>;
  @ViewChild('menuContent') private readonly menuContent?: ElementRef<HTMLElement>;

  private readonly resolvedAlignSignal = signal<DropdownMenuAlign>('start');
  readonly resolvedAlign = this.resolvedAlignSignal;
  private readonly resolvedSideSignal = signal<DropdownMenuSide>('bottom');
  readonly resolvedSide = this.resolvedSideSignal;

  readonly menuState = computed(() => (this.open() ? 'open' : 'closed'));
  readonly hostClasses = computed(() => `relative inline-block text-left ${this.class()}`.trim());

  readonly contentAlignmentClass = computed(() => {
    const align = this.resolvedAlign();
    switch (align) {
      case 'end':
        return 'right-0';
      case 'center':
        return 'left-1/2 -translate-x-1/2';
      default:
        return 'left-0';
    }
  });

  readonly contentSideClass = computed(() => {
    const side = this.resolvedSide();
    return side === 'top' ? 'bottom-full' : 'top-full';
  });

  constructor() {
    this.resolvedAlignSignal.set(this.align());
    this.resolvedSideSignal.set(this.side());

    effect(() => {
      if (!this.open()) {
        this.resolvedAlignSignal.set(this.align());
      }
    });

    effect(() => {
      if (!this.open()) {
        this.resolvedSideSignal.set(this.side());
      }
    });

    effect(() => {
      this.sections();
      this.menuWidth();
      if (this.open()) {
        queueMicrotask(() => this.updatePlacement());
      }
    });

    effect(() => {
      if (this.open()) {
        queueMicrotask(() => this.focusFirstItem());
      }
    });
  }

  toggleMenu(): void {
    if (this.disabled()) {
      return;
    }

    if (this.open()) {
      this.closeMenu();
    } else {
      this.open.set(true);
    }
  }

  openMenu(): void {
    if (!this.disabled()) {
      this.open.set(true);
    }
  }

  closeMenu(options?: { focusTrigger?: boolean }): void {
    if (!this.open()) {
      return;
    }

    this.open.set(false);
    this.resolvedAlignSignal.set(this.align());
    this.resolvedSideSignal.set(this.side());

    if (options?.focusTrigger) {
      queueMicrotask(() => this.focusTrigger());
    }
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      this.openMenu();
    }

    if ((event.key === ' ' || event.key === 'Enter') && !this.open()) {
      event.preventDefault();
      this.openMenu();
    }
  }

  onItemKeydown(event: KeyboardEvent, item: DropdownMenuItem): void {
    const items = this.getFocusableItems();
    const currentElement = event.target as HTMLButtonElement | null;
    const currentIndex = currentElement ? items.indexOf(currentElement) : -1;

    if (currentIndex === -1) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.focusNextItem(currentIndex);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.focusPreviousItem(currentIndex);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.focusFirstItem();
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.focusLastItem();
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMenu({ focusTrigger: true });
      return;
    }

    if ((event.key === 'Enter' || event.key === ' ') && !item.disabled) {
      event.preventDefault();
      this.selectItem(item);
    }
  }

  selectItem(item: DropdownMenuItem): void {
    if (item.disabled) {
      return;
    }

    this.itemSelected.emit(item);

    if (this.closeOnSelect()) {
      this.closeMenu({ focusTrigger: true });
    }
  }

  trackSection(index: number, section: DropdownMenuSection): string {
    return section.id ?? `section-${index}`;
  }

  trackItem(_: number, item: DropdownMenuItem): string {
    return item.value;
  }

  private focusFirstItem(): void {
    const items = this.getFocusableItems();
    items[0]?.focus();
  }

  private focusLastItem(): void {
    const items = this.getFocusableItems();
    items[items.length - 1]?.focus();
  }

  private focusNextItem(currentIndex: number): void {
    const items = this.getFocusableItems();
    if (!items.length) {
      return;
    }

    const nextIndex = (currentIndex + 1) % items.length;
    items[nextIndex]?.focus();
  }

  private focusPreviousItem(currentIndex: number): void {
    const items = this.getFocusableItems();
    if (!items.length) {
      return;
    }

    const prevIndex = (currentIndex - 1 + items.length) % items.length;
    items[prevIndex]?.focus();
  }

  private getFocusableItems(): HTMLButtonElement[] {
    const buttons = this.menuButtons?.toArray().map((ref) => ref.nativeElement) ?? [];
    return buttons.filter((button) => !button.disabled);
  }

  private focusTrigger(): void {
    const trigger = this.triggerButton?.nativeElement;
    trigger?.focus({ preventScroll: true });
  }

  private updatePlacement(): void {
    const host = this.hostRef.nativeElement;
    const trigger = this.triggerButton?.nativeElement;
    if (!trigger) {
      return;
    }

    const menu = this.menuContent?.nativeElement ?? null;
    const hostRect = host.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const contentWidth = menu?.offsetWidth ?? hostRect.width;
    const contentHeight = menu?.offsetHeight ?? hostRect.height * 4;

    const spaceLeft = hostRect.left;
    const spaceRight = viewportWidth - hostRect.right;
    const spaceAbove = hostRect.top;
    const spaceBelow = viewportHeight - hostRect.bottom;

    let computedAlign = this.align();

    if (computedAlign === 'center') {
      const centeredLeft = hostRect.left + hostRect.width / 2 - contentWidth / 2;
      const centeredRight = centeredLeft + contentWidth;
      if (centeredLeft < 8 && spaceRight >= spaceLeft) {
        computedAlign = 'start';
      } else if (centeredRight > viewportWidth - 8 && spaceLeft > spaceRight) {
        computedAlign = 'end';
      }
    } else {
      if (spaceRight < contentWidth && spaceLeft > spaceRight) {
        computedAlign = 'end';
      } else if (spaceLeft < contentWidth && spaceRight >= spaceLeft) {
        computedAlign = 'start';
      }
    }

    this.resolvedAlignSignal.set(computedAlign);

    let computedSide = this.side();

    if (spaceBelow < contentHeight && spaceAbove > spaceBelow) {
      computedSide = 'top';
    } else if (spaceAbove < contentHeight && spaceBelow >= spaceAbove) {
      computedSide = 'bottom';
    }

    this.resolvedSideSignal.set(computedSide);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.open()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this.hostRef.nativeElement.contains(target)) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.open()) {
      this.closeMenu({ focusTrigger: true });
    }
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.open()) {
      this.updatePlacement();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.open()) {
      this.updatePlacement();
    }
  }
}
