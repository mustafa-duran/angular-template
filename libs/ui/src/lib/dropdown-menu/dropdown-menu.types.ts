export type DropdownMenuAlign = 'start' | 'center' | 'end';

export type DropdownMenuSide = 'bottom' | 'top';

export interface DropdownMenuIcon {
  /**
   * SVG path definition for the icon.
   */
  path: string;
  /**
   * Optional viewBox override for the icon.
   * Defaults to `0 0 24 24` when not provided.
   */
  viewBox?: string;
}

export interface DropdownMenuItem {
  /**
   * Unique identifier for the menu item.
   */
  value: string;
  /**
   * Visible text label for the item.
   */
  label: string;
  /**
   * Optional short description displayed under the label.
   */
  description?: string;
  /**
   * Optional keyboard shortcut hint shown on the right side.
   */
  shortcut?: string;
  /**
   * Optional icon data rendered before the label.
   */
  icon?: DropdownMenuIcon;
  /**
   * Marks the item as disabled and removes it from keyboard navigation.
   */
  disabled?: boolean;
  /**
   * Highlights the item as destructive (e.g. delete actions).
   */
  destructive?: boolean;
}

export interface DropdownMenuSection {
  /**
   * Optional unique id for the section. When omitted the index is used.
   */
  id?: string;
  /**
   * Optional section label rendered above its items.
   */
  label?: string;
  /**
   * Collection of actionable items belonging to the section.
   */
  items: ReadonlyArray<DropdownMenuItem>;
}
