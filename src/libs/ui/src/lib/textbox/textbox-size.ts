export type TextboxSize = 'default' | 'sm' | 'lg';

export const TEXTBOX_SIZE: Record<TextboxSize, string> = {
  default: 'h-9 px-3 py-1 text-base md:text-sm',
  sm: 'h-8 px-3 text-sm',
  lg: 'h-10 px-4 text-base',
} as const;
