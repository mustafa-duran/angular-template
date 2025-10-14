export const joinClasses = (...tokens: Array<string | undefined | null | false>): string =>
  tokens.filter(Boolean).join(' ');
