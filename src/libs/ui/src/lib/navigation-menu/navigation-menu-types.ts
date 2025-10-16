export interface NavigationMenuChild {
  readonly id?: string;
  readonly label: string;
  readonly href: string;
  readonly description?: string;
  readonly external?: boolean;
}

export interface NavigationMenuItem {
  readonly id?: string;
  readonly label: string;
  readonly href?: string;
  readonly external?: boolean;
  readonly children?: ReadonlyArray<NavigationMenuChild>;
}
