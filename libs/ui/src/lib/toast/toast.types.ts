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
}

export interface ToastOptions {
  description?: string;
  action?: ToastAction;
  duration?: number;
}
