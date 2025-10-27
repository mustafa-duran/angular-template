import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  signal
} from '@angular/core';
import { SelectOption } from './select.types';

@Component({
  selector: 'select-root, ui-select',
  imports: [CommonModule],
  templateUrl: './select.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex w-full flex-col gap-2 text-sm text-foreground'
  }
})
export class Select {
  private readonly hostRef = inject(ElementRef<HTMLElement>);

  @Input() options: ReadonlyArray<SelectOption> = [];
  @Input() selectedValue: string | null = null;
  @Input() placeholder = 'Select an option';

  @Output() readonly selectionChange = new EventEmitter<string>();
  @Output() readonly optionSelected = new EventEmitter<SelectOption>();

  readonly menuOpen = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  selectOption(option: SelectOption): void {
    this.selectedValue = option.value;
    this.selectionChange.emit(option.value);
    this.optionSelected.emit(option);
    this.menuOpen.set(false);
  }

  isActive(option: SelectOption): boolean {
    return this.selectedValue === option.value;
  }

  triggerLabel(): string {
    const selected = this.options.find((option) => option.value === this.selectedValue);
    return selected?.label ?? this.placeholder;
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    if (!this.menuOpen()) {
      return;
    }

    const target = event.target as Node | null;
    if (target && !this.hostRef.nativeElement.contains(target)) {
      this.menuOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  closeOnEscape(): void {
    this.menuOpen.set(false);
  }
}
