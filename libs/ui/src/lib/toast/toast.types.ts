export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  action?: ToastAction;
  cancel?: ToastAction;
  duration?: number;
  dismissible?: boolean;
  className?: string;
}

export interface ToasterConfig {
  position?: ToastPosition;
  expand?: boolean;
  visibleToasts?: number;
  closeButton?: boolean;
  richColors?: boolean;
  duration?: number;
  gap?: number;
  theme?: 'light' | 'dark' | 'system';
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  offset?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
}

export interface ToastOptions {
  type?: ToastType;
  description?: string;
  action?: ToastAction;
  cancel?: ToastAction;
  duration?: number;
  dismissible?: boolean;
  className?: string;
}
