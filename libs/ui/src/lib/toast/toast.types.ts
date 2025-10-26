export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: ToastAction;
  duration?: number;
  dismissible?: boolean;
}

export interface ToastOptions {
  description?: string;
  action?: ToastAction;
  duration?: number;
  dismissible?: boolean;
}
