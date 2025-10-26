import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnDestroy } from '@angular/core';
import { MAX_VISIBLE_TOASTS } from './toast.constants';
import { ToastService } from './toast.service';
import type { ToastAction } from './toast.types';

@Component({
  selector: 'ui-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastComponent implements OnDestroy {
  private readonly toastService = inject(ToastService);

  readonly toasts = this.toastService.toasts$;

  readonly visibleToasts = computed(() => {
    const toasts = this.toasts();
    return toasts.slice(-MAX_VISIBLE_TOASTS).reverse();
  });

  ngOnDestroy(): void {
    this.toastService.dismissAll();
  }

  dismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  handleAction(action: ToastAction | undefined): void {
    if (action?.onClick) {
      action.onClick();
    }
  }
}
