export const NAVIGATION_MENU_CLASSES = {
  root: 'relative z-10 flex max-w-max flex-1 items-center justify-center',
  list: 'group flex flex-1 list-none items-center justify-center gap-1',
  item: 'relative flex',
  trigger: {
    base: 'group w-max bg-background text-foreground [&_svg]:size-3 [&_svg]:transition [&_svg]:duration-300',
    open: 'bg-accent/50 text-accent-foreground hover:bg-accent focus:bg-accent',
  },
  link: 'inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset focus-visible:ring-offset-background',
  indicator: {
    container:
      'pointer-events-none absolute left-1/2 top-full z-[1] flex h-1.5 -translate-x-1/2 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
    shape: 'relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md',
  },
  viewportWrapper: 'absolute left-0 top-full flex w-full justify-center md:w-auto',
  viewport:
    'relative mt-1.5 min-w-[240px] max-w-[90vw] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
  content: 'grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]',
  dropdown: {
    link: 'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
    label: 'text-sm font-medium leading-none',
    description: 'text-sm text-muted-foreground line-clamp-2',
  },
} as const;
