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
      type: options?.type ?? 'default',
      title,
      description: options?.description,
      action: options?.action,
      cancel: options?.cancel,
      duration,
      dismissible: options?.dismissible ?? true,
      className: options?.className
    };

    this.toasts.update((toasts) => [...toasts, toast]);

    if (duration > 0 && toast.type !== 'loading') {
      this.startTimer(id, duration);
    }

    return id;
  }

  toast(title: string, options?: ToastOptions): string {
    return this.createToast(title, { ...options, type: 'default' });
  }

  success(title: string, options?: Omit<ToastOptions, 'type'>): string {
    return this.createToast(title, { ...options, type: 'success' });
  }

  error(title: string, options?: Omit<ToastOptions, 'type'>): string {
    return this.createToast(title, { ...options, type: 'error' });
  }

  warning(title: string, options?: Omit<ToastOptions, 'type'>): string {
    return this.createToast(title, { ...options, type: 'warning' });
  }

  info(title: string, options?: Omit<ToastOptions, 'type'>): string {
    return this.createToast(title, { ...options, type: 'info' });
  }

  loading(title: string, options?: Omit<ToastOptions, 'type'>): string {
    return this.createToast(title, { ...options, type: 'loading', duration: 0 });
  }

  promise<T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error) => string);
    }
  ): Promise<T> {
    const id = this.loading(options.loading);

    return promise
      .then((data) => {
        this.dismiss(id);
        const message =
          typeof options.success === 'function' ? options.success(data) : options.success;
        this.success(message);
        return data;
      })
      .catch((error: Error) => {
        this.dismiss(id);
        const message = typeof options.error === 'function' ? options.error(error) : options.error;
        this.error(message);
        throw error;
      });
  }

  dismiss(id: string): void {
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }

  dismissAll(): void {
    this.toasts.set([]);
    this.timers.forEach(({ timeoutId }) => clearTimeout(timeoutId));
    this.timers.clear();
    this.pausedToasts.clear();
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
    const timer = this.timers.get(id);
    if (timer && !this.pausedToasts.has(id)) {
      clearTimeout(timer.timeoutId);
      timer.remaining = timer.remaining - (Date.now() - timer.startTime);
      this.pausedToasts.add(id);
    }
  }

  resumeTimer(id: string): void {
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
}
