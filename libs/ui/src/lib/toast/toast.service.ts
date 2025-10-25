import { Injectable, signal } from '@angular/core';
import { DEFAULT_TOASTER_CONFIG } from './toast.constants';
import type { Toast, ToastOptions, ToasterConfig } from './toast.types';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toasts = signal<Toast[]>([]);
  private config = signal<ToasterConfig>(DEFAULT_TOASTER_CONFIG);
  private toastIdCounter = 0;
  private timers = new Map<string, { timeoutId: any; remaining: number; startTime: number }>();
  private pausedToasts = new Set<string>();
  private removalTimers = new Map<string, any>();
  private readonly exitAnimationDuration = 360;

  readonly toasts$ = this.toasts.asReadonly();
  readonly config$ = this.config.asReadonly();

  configure(config: Partial<ToasterConfig>): void {
    this.config.update((current) => ({ ...current, ...config }));
  }

  private createToast(title: string, options?: ToastOptions): string {
    const id = `toast-${++this.toastIdCounter}-${Date.now()}`;
    const duration = options?.duration ?? this.config().duration ?? 4000;

    const toast: Toast = {
      id,
      title,
      description: options?.description,
      action: options?.action,
      cancel: options?.cancel,
      duration,
      dismissible: options?.dismissible ?? true,
      className: options?.className,
      removing: false
    };

    this.toasts.update((toasts) => [...toasts, toast]);

    if (duration > 0) {
      this.startTimer(id, duration);
    }

    return id;
  }

  toast(title: string, options?: ToastOptions): string {
    return this.createToast(title, options);
  }

  dismiss(id: string): void {
    const toast = this.toasts().find((t) => t.id === id);
    if (!toast || toast.removing) {
      return;
    }

    this.clearTimer(id);

    this.toasts.update((toasts) =>
      toasts.map((current) => (current.id === id ? { ...current, removing: true } : current))
    );

    this.scheduleRemoval(id);
  }

  dismissAll(): void {
    this.toasts()
      .filter((toast) => !toast.removing)
      .forEach((toast) => this.dismiss(toast.id));
  }

  update(id: string, updates: Partial<Toast>): void {
    this.toasts.update((toasts) =>
      toasts.map((toast) => (toast.id === id ? { ...toast, ...updates } : toast))
    );
  }

  private startTimer(id: string, duration: number): void {
    const timeoutId = setTimeout(() => {
      this.timers.delete(id);
      this.pausedToasts.delete(id);
      this.dismiss(id);
    }, duration);

    this.timers.set(id, { timeoutId, remaining: duration, startTime: Date.now() });
  }

  pauseTimer(id: string): void {
    const toast = this.toasts().find((t) => t.id === id);
    if (!toast || toast.removing) {
      return;
    }

    const timer = this.timers.get(id);
    if (timer && !this.pausedToasts.has(id)) {
      clearTimeout(timer.timeoutId);
      timer.remaining = timer.remaining - (Date.now() - timer.startTime);
      this.pausedToasts.add(id);
    }
  }

  resumeTimer(id: string): void {
    const toast = this.toasts().find((t) => t.id === id);
    if (!toast || toast.removing) {
      return;
    }

    const timer = this.timers.get(id);
    if (timer && this.pausedToasts.has(id)) {
      const newTimeoutId = setTimeout(() => {
        this.timers.delete(id);
        this.pausedToasts.delete(id);
        this.dismiss(id);
      }, timer.remaining);

      timer.timeoutId = newTimeoutId;
      timer.startTime = Date.now();
      this.pausedToasts.delete(id);
    }
  }

  private clearTimer(id: string): void {
    const timer = this.timers.get(id);
    if (timer) {
      clearTimeout(timer.timeoutId);
      this.timers.delete(id);
    }

    this.pausedToasts.delete(id);
  }

  private scheduleRemoval(id: string): void {
    if (this.removalTimers.has(id)) {
      return;
    }

    const timeoutId = setTimeout(() => {
      this.removalTimers.delete(id);
      this.toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
    }, this.exitAnimationDuration);

    this.removalTimers.set(id, timeoutId);
  }
}
