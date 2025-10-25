import type { ToasterConfig } from './toast.types';

export const DEFAULT_TOASTER_CONFIG: ToasterConfig = {
  position: 'top-center',
  expand: false,
  visibleToasts: 3,
  closeButton: false,
  duration: 4000,
  gap: 12,
  theme: 'system',
  offset: '24px',
  dir: 'auto'
};

export const TOASTER_CLASSES = 'toaster group fixed z-[100]';

export const TOAST_CLASSES = {
  base: 'toast-item group toast relative flex w-[356px] items-center justify-between gap-4 rounded-lg border bg-background p-4 shadow-lg select-none',
  description: 'text-sm text-muted-foreground opacity-90',
  actionButton:
    'inline-flex h-8 shrink-0 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  cancelButton:
    'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-muted px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
};

export const TOAST_POSITION_CLASSES: Record<string, string> = {
  'top-left': 'top-0 left-0',
  'top-center': 'top-0 left-1/2 -translate-x-1/2',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2',
  'bottom-right': 'bottom-0 right-0'
};
