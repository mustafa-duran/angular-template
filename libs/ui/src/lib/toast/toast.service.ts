import { Injectable, signal } from '@angular/core';
import { DEFAULT_TOAST_DURATION, MAX_VISIBLE_TOASTS } from './toast.constants';
import type { Toast, ToastOptions } from './toast.types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly toasts = signal<Toast[]>([]);
  private toastIdCounter = 0;
  private readonly timers = new Map<string, ReturnType<typeof setTimeout>>();

  readonly toasts$ = this.toasts.asReadonly();

  toast(title: string, options?: ToastOptions): string {
    const id = `toast-${++this.toastIdCounter}-${Date.now()}`;
    const duration = options?.duration ?? DEFAULT_TOAST_DURATION;

    const toast: Toast = {
      id,
      title,
      description: options?.description,
      action: options?.action,
      duration
    };

    this.toasts.update((current) => {
      const updated = [...current, toast];
      if (updated.length > MAX_VISIBLE_TOASTS) {
        return updated.slice(updated.length - MAX_VISIBLE_TOASTS);
      }
      return updated;
    });

    if (duration > 0) {
      const timeoutId = setTimeout(() => this.dismiss(id), duration);
      this.timers.set(id, timeoutId);
    }

    return id;
  }

  dismiss(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(id);
    }

    this.toasts.update((current) => current.filter((toast) => toast.id !== id));
  }

  dismissAll(): void {
    this.timers.forEach((timer) => clearTimeout(timer));
    this.timers.clear();
    this.toasts.set([]);
  }
}
