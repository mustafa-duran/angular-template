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
  title?: string;
  description?: string;
  action?: ToastAction;
  cancel?: ToastAction;
  duration?: number;
  dismissible?: boolean;
  className?: string;
  removing?: boolean;
}

export interface ToasterConfig {
  position?: ToastPosition;
  expand?: boolean;
  visibleToasts?: number;
  closeButton?: boolean;
  duration?: number;
  gap?: number;
  theme?: 'light' | 'dark' | 'system';
  className?: string;
  style?: Partial<CSSStyleDeclaration>;
  offset?: string;
  dir?: 'ltr' | 'rtl' | 'auto';
}

export interface ToastOptions {
  description?: string;
  action?: ToastAction;
  cancel?: ToastAction;
  duration?: number;
  dismissible?: boolean;
  className?: string;
}
