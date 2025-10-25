import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  DEFAULT_TOASTER_CONFIG,
  TOAST_CLASSES,
  TOAST_ICONS,
  TOAST_POSITION_CLASSES,
  TOASTER_CLASSES
} from './toast.constants';
import { ToastService } from './toast.service';
import type { Toast, ToasterConfig } from './toast.types';

@Component({
  selector: 'ui-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./toast.css']
})
export class ToastComponent implements OnDestroy {
  private readonly toastService = inject(ToastService);
  private readonly sanitizer = inject(DomSanitizer);

  position = input<ToasterConfig['position']>(DEFAULT_TOASTER_CONFIG.position);
  expand = input<boolean>(DEFAULT_TOASTER_CONFIG.expand ?? false);
  visibleToasts = input<number>(DEFAULT_TOASTER_CONFIG.visibleToasts ?? 3);
  closeButton = input<boolean>(DEFAULT_TOASTER_CONFIG.closeButton ?? false);
  richColors = input<boolean>(DEFAULT_TOASTER_CONFIG.richColors ?? false);
  offset = input<string>(DEFAULT_TOASTER_CONFIG.offset ?? '32px');
  dir = input<ToasterConfig['dir']>(DEFAULT_TOASTER_CONFIG.dir);
  theme = input<ToasterConfig['theme']>(DEFAULT_TOASTER_CONFIG.theme);
  gap = input<number>(DEFAULT_TOASTER_CONFIG.gap ?? 14);
  className = input<string>('');

  readonly toasts = this.toastService.toasts$;

  readonly toasterClasses = TOASTER_CLASSES;

  readonly toastClasses = TOAST_CLASSES;

  visibleToastsList = computed(() => {
    const toasts = this.toasts();
    const maxVisible = this.visibleToasts();
    return toasts.slice(-maxVisible).reverse();
  });

  positionClasses = computed(
    () =>
      TOAST_POSITION_CLASSES[this.position() ?? 'top-center'] ??
      TOAST_POSITION_CLASSES['top-center']
  );

  containerStyles = computed(() => {
    const gap = `${this.gap()}px`;
    const offset = this.offset();
    const position = this.position() ?? DEFAULT_TOASTER_CONFIG.position;

    const styles: Record<string, string> = {
      '--gap': gap
    };

    if (position?.startsWith('top')) {
      styles['top'] = offset;
      styles['bottom'] = 'unset';
    } else {
      styles['bottom'] = offset;
      styles['top'] = 'unset';
    }

    return styles;
  });

  constructor() {
    effect(() => {
      this.toastService.configure({
        position: this.position(),
        expand: this.expand(),
        visibleToasts: this.visibleToasts(),
        closeButton: this.closeButton(),
        richColors: this.richColors(),
        offset: this.offset(),
        dir: this.dir(),
        theme: this.theme(),
        gap: this.gap()
      });
    });
  }

  ngOnDestroy(): void {
    this.toastService.dismissAll();
  }

  getToastIcon(type: Toast['type']): SafeHtml {
    const iconSvg = TOAST_ICONS[type] ?? '';
    return this.sanitizer.bypassSecurityTrustHtml(iconSvg);
  }

  getToastClasses(toast: Toast): string {
    const baseClass = this.toastClasses.base;
    const customClass = toast.className ?? '';
    const richColorClass = this.richColors() ? `toast-${toast.type}` : '';

    return [baseClass, richColorClass, customClass].filter(Boolean).join(' ');
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  handleAction(action: Toast['action']): void {
    if (action?.onClick) {
      action.onClick();
    }
  }

  handleCancel(toast: Toast): void {
    if (toast.cancel?.onClick) {
      toast.cancel.onClick();
    } else {
      this.dismiss(toast.id);
    }
  }

  onContainerHover(action: 'enter' | 'leave'): void {
    const currentToasts = this.toasts();
    currentToasts.forEach((toast) => {
      if (toast.removing) {
        return;
      }

      if (action === 'enter') {
        this.toastService.pauseTimer(toast.id);
      } else {
        this.toastService.resumeTimer(toast.id);
      }
    });
  }
}
