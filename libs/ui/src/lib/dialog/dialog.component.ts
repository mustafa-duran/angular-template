import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  input,
  model
} from '@angular/core';
import {
  DIALOG_CLOSE_BUTTON_CLASSES,
  DIALOG_CONTENT_CLASSES,
  DIALOG_OVERLAY_CLASSES
} from './dialog.constants';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [],
  templateUrl: './dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  open = model<boolean>(false);
  showCloseButton = input<boolean>(true);

  readonly overlayClasses = DIALOG_OVERLAY_CLASSES;
  readonly contentClasses = DIALOG_CONTENT_CLASSES;
  readonly closeButtonClasses = DIALOG_CLOSE_BUTTON_CLASSES;

  dataState = computed(() => (this.open() ? 'open' : 'closed'));

  constructor() {
    effect(() => {
      document.body.style.overflow = this.open() ? 'hidden' : '';
    });
  }

  close(): void {
    this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.open()) {
      this.close();
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
