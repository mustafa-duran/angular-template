import type { TextboxInputType } from './textbox-input-type';

export type TextboxVariant = 'default' | 'email' | 'password' | 'file' | 'disabled';

export interface TextboxVariantConfig {
  readonly type: TextboxInputType;
  readonly placeholder?: string | null;
  readonly disabled?: boolean;
  readonly className?: string | null;
}

export const TEXTBOX_VARIANT: Record<TextboxVariant, TextboxVariantConfig> = {
  default: {
    type: 'text',
    placeholder: null,
  },
  email: {
    type: 'email',
    placeholder: 'Email',
  },
  password: {
    type: 'password',
    placeholder: 'Password',
  },
  file: {
    type: 'file',
    placeholder: null,
    className: 'file:cursor-pointer',
  },
  disabled: {
    type: 'text',
    placeholder: 'Email',
    disabled: true,
  },
} as const;
