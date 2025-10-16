import * as _angular_core from '@angular/core';
import * as ui from 'ui';
import { ControlValueAccessor } from '@angular/forms';

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
declare const SIZE: Record<ButtonSize, string>;

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
declare const VARIANT: Record<ButtonVariant, string>;

declare class UiButtonComponent {
    readonly variant: _angular_core.InputSignal<ButtonVariant>;
    readonly size: _angular_core.InputSignal<ButtonSize>;
    readonly disabled: _angular_core.InputSignal<boolean>;
    readonly type: _angular_core.InputSignal<"button" | "submit" | "reset">;
    readonly className: _angular_core.InputSignal<string>;
    protected readonly classes: _angular_core.Signal<string>;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<UiButtonComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<UiButtonComponent, "ui-button", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "className": { "alias": "class"; "required": false; "isSignal": true; }; }, {}, never, ["*"], true, never>;
}

interface NavigationMenuChild {
    readonly id?: string;
    readonly label: string;
    readonly href: string;
    readonly description?: string;
    readonly external?: boolean;
}
interface NavigationMenuItem {
    readonly id?: string;
    readonly label: string;
    readonly href?: string;
    readonly external?: boolean;
    readonly children?: ReadonlyArray<NavigationMenuChild>;
}

declare class UiNavigationMenuComponent {
    private readonly hostRef;
    private readonly idPrefix;
    readonly items: _angular_core.InputSignal<readonly NavigationMenuItem[]>;
    readonly className: _angular_core.InputSignal<string>;
    readonly ariaLabel: _angular_core.InputSignal<string>;
    private readonly activeIndexSignal;
    protected readonly activeIndex: _angular_core.Signal<number | null>;
    protected readonly rootClasses: _angular_core.Signal<string>;
    protected readonly listClasses: _angular_core.Signal<"group flex flex-1 list-none items-center justify-center gap-1">;
    protected readonly itemClasses: _angular_core.Signal<"relative flex">;
    protected readonly triggerVariant: 'ghost';
    protected readonly linkClasses: _angular_core.Signal<"inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset focus-visible:ring-offset-background">;
    protected readonly indicatorClasses: _angular_core.Signal<"pointer-events-none absolute left-1/2 top-full z-[1] flex h-1.5 -translate-x-1/2 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in">;
    protected readonly indicatorShapeClasses: _angular_core.Signal<"relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md">;
    protected readonly viewportWrapperClasses: _angular_core.Signal<"absolute left-0 top-full flex w-full justify-center md:w-auto">;
    protected readonly viewportClasses: _angular_core.Signal<"relative mt-1.5 min-w-[240px] max-w-[90vw] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90">;
    protected readonly contentClasses: _angular_core.Signal<"grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">;
    protected readonly dropdownLinkClasses: _angular_core.Signal<"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">;
    protected readonly dropdownLabelClasses: _angular_core.Signal<"text-sm font-medium leading-none">;
    protected readonly dropdownDescriptionClasses: _angular_core.Signal<"text-sm text-muted-foreground line-clamp-2">;
    protected readonly activeItem: _angular_core.Signal<NavigationMenuItem | null>;
    protected readonly activeChildren: _angular_core.Signal<readonly NavigationMenuChild[] | null>;
    protected readonly hasActiveDropdown: _angular_core.Signal<boolean>;
    protected readonly indicatorState: _angular_core.Signal<"visible" | "hidden">;
    protected readonly viewportState: _angular_core.Signal<"open" | "closed">;
    protected readonly viewportId: _angular_core.Signal<string | null>;
    protected readonly viewportLabelId: _angular_core.Signal<string | null>;
    protected readonly trackItem: (index: number, item: NavigationMenuItem) => string;
    protected readonly trackChild: (index: number, child: NavigationMenuChild) => string;
    protected resolveTriggerId(index: number): string;
    protected resolvePanelId(index: number): string;
    protected resolveTriggerClasses(index: number): string;
    protected openDropdown(index: number): void;
    protected toggleDropdown(index: number): void;
    protected closeAll(): void;
    protected handleHostMouseLeave(): void;
    protected handleViewportLeave(): void;
    protected handleFocusOut(event: FocusEvent): void;
    protected handleLinkInteraction(): void;
    private hasChildrenAt;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<UiNavigationMenuComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<UiNavigationMenuComponent, "ui-navigation-menu", never, { "items": { "alias": "items"; "required": false; "isSignal": true; }; "className": { "alias": "class"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "aria-label"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}

declare const NAVIGATION_MENU_CLASSES: {
    readonly root: "relative z-10 flex max-w-max flex-1 items-center justify-center";
    readonly list: "group flex flex-1 list-none items-center justify-center gap-1";
    readonly item: "relative flex";
    readonly trigger: {
        readonly base: "group w-max bg-background text-foreground [&_svg]:size-3 [&_svg]:transition [&_svg]:duration-300";
        readonly open: "bg-accent/50 text-accent-foreground hover:bg-accent focus:bg-accent";
    };
    readonly link: "inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset focus-visible:ring-offset-background";
    readonly indicator: {
        readonly container: "pointer-events-none absolute left-1/2 top-full z-[1] flex h-1.5 -translate-x-1/2 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in";
        readonly shape: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md";
    };
    readonly viewportWrapper: "absolute left-0 top-full flex w-full justify-center md:w-auto";
    readonly viewport: "relative mt-1.5 min-w-[240px] max-w-[90vw] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90";
    readonly content: "grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]";
    readonly dropdown: {
        readonly link: "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";
        readonly label: "text-sm font-medium leading-none";
        readonly description: "text-sm text-muted-foreground line-clamp-2";
    };
};

type TextboxInputType = 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' | 'number' | 'time' | 'date' | 'datetime-local' | 'month' | 'week' | 'color' | 'file';
declare const TEXTBOX_INPUT_TYPES: readonly TextboxInputType[];

type TextboxSize = 'default' | 'sm' | 'lg';
declare const TEXTBOX_SIZE: Record<TextboxSize, string>;

type TextboxVariant = 'default' | 'email' | 'password' | 'file' | 'disabled';
interface TextboxVariantConfig {
    readonly type: TextboxInputType;
    readonly placeholder?: string | null;
    readonly disabled?: boolean;
    readonly className?: string | null;
}
declare const TEXTBOX_VARIANT: Record<TextboxVariant, TextboxVariantConfig>;

declare class UiTextboxComponent implements ControlValueAccessor {
    private readonly internalId;
    readonly variant: _angular_core.InputSignal<TextboxVariant>;
    readonly size: _angular_core.InputSignal<TextboxSize>;
    readonly type: _angular_core.InputSignal<TextboxInputType | null>;
    readonly className: _angular_core.InputSignal<string>;
    readonly placeholder: _angular_core.InputSignal<string | null>;
    readonly name: _angular_core.InputSignal<string | null>;
    readonly id: _angular_core.InputSignal<string | null>;
    readonly autocomplete: _angular_core.InputSignal<string | null>;
    readonly autocapitalize: _angular_core.InputSignal<string | null>;
    readonly autocorrect: _angular_core.InputSignal<string | null>;
    readonly inputmode: _angular_core.InputSignal<string | null>;
    readonly min: _angular_core.InputSignal<string | null>;
    readonly max: _angular_core.InputSignal<string | null>;
    readonly step: _angular_core.InputSignal<string | null>;
    readonly minlength: _angular_core.InputSignal<number | null>;
    readonly maxlength: _angular_core.InputSignal<number | null>;
    readonly pattern: _angular_core.InputSignal<string | null>;
    readonly accept: _angular_core.InputSignal<string | null>;
    readonly multiple: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly ariaLabel: _angular_core.InputSignal<string | null>;
    readonly ariaDescribedby: _angular_core.InputSignal<string | null>;
    readonly ariaInvalid: _angular_core.InputSignal<string | null>;
    readonly autofocus: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly required: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly readonlyInput: _angular_core.InputSignalWithTransform<boolean, unknown>;
    readonly disabledInput: _angular_core.InputSignalWithTransform<boolean, unknown>;
    private readonly valueSignal;
    private readonly disabledFromControl;
    protected readonly value: _angular_core.Signal<string>;
    private onChange;
    private onTouched;
    protected readonly config: _angular_core.Signal<ui.TextboxVariantConfig>;
    protected readonly controlId: _angular_core.Signal<string>;
    protected readonly resolvedType: _angular_core.Signal<TextboxInputType>;
    protected readonly resolvedPlaceholder: _angular_core.Signal<string | null>;
    protected readonly classes: _angular_core.Signal<string>;
    protected readonly isFile: _angular_core.Signal<boolean>;
    protected readonly isDisabled: _angular_core.Signal<boolean>;
    protected readonly isReadonly: _angular_core.Signal<boolean>;
    handleInput(event: Event): void;
    handleBlur(): void;
    writeValue(value: unknown): void;
    registerOnChange(fn: (value: unknown) => void): void;
    registerOnTouched(fn: () => void): void;
    setDisabledState(isDisabled: boolean): void;
    static ɵfac: _angular_core.ɵɵFactoryDeclaration<UiTextboxComponent, never>;
    static ɵcmp: _angular_core.ɵɵComponentDeclaration<UiTextboxComponent, "ui-textbox", never, { "variant": { "alias": "variant"; "required": false; "isSignal": true; }; "size": { "alias": "size"; "required": false; "isSignal": true; }; "type": { "alias": "type"; "required": false; "isSignal": true; }; "className": { "alias": "class"; "required": false; "isSignal": true; }; "placeholder": { "alias": "placeholder"; "required": false; "isSignal": true; }; "name": { "alias": "name"; "required": false; "isSignal": true; }; "id": { "alias": "id"; "required": false; "isSignal": true; }; "autocomplete": { "alias": "autocomplete"; "required": false; "isSignal": true; }; "autocapitalize": { "alias": "autocapitalize"; "required": false; "isSignal": true; }; "autocorrect": { "alias": "autocorrect"; "required": false; "isSignal": true; }; "inputmode": { "alias": "inputmode"; "required": false; "isSignal": true; }; "min": { "alias": "min"; "required": false; "isSignal": true; }; "max": { "alias": "max"; "required": false; "isSignal": true; }; "step": { "alias": "step"; "required": false; "isSignal": true; }; "minlength": { "alias": "minlength"; "required": false; "isSignal": true; }; "maxlength": { "alias": "maxlength"; "required": false; "isSignal": true; }; "pattern": { "alias": "pattern"; "required": false; "isSignal": true; }; "accept": { "alias": "accept"; "required": false; "isSignal": true; }; "multiple": { "alias": "multiple"; "required": false; "isSignal": true; }; "ariaLabel": { "alias": "aria-label"; "required": false; "isSignal": true; }; "ariaDescribedby": { "alias": "aria-describedby"; "required": false; "isSignal": true; }; "ariaInvalid": { "alias": "aria-invalid"; "required": false; "isSignal": true; }; "autofocus": { "alias": "autofocus"; "required": false; "isSignal": true; }; "required": { "alias": "required"; "required": false; "isSignal": true; }; "readonlyInput": { "alias": "readonly"; "required": false; "isSignal": true; }; "disabledInput": { "alias": "disabled"; "required": false; "isSignal": true; }; }, {}, never, never, true, never>;
}
type TextboxControlValue = string | FileList | null;

export { NAVIGATION_MENU_CLASSES, SIZE, TEXTBOX_INPUT_TYPES, TEXTBOX_SIZE, TEXTBOX_VARIANT, UiButtonComponent, UiNavigationMenuComponent, UiTextboxComponent, VARIANT };
export type { ButtonSize, ButtonVariant, NavigationMenuChild, NavigationMenuItem, TextboxControlValue, TextboxInputType, TextboxSize, TextboxVariant, TextboxVariantConfig };
