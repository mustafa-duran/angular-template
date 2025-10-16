import * as i0 from '@angular/core';
import { input, computed, ChangeDetectionStrategy, Component, inject, ElementRef, signal, booleanAttribute } from '@angular/core';
import { joinClasses } from '@core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const SIZE = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 rounded-md px-3 text-xs',
    lg: 'h-10 rounded-md px-8',
    icon: 'h-9 w-9',
};

const VARIANT = {
    default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
};

const BASE$1 = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';
class UiButtonComponent {
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : []));
    size = input('default', ...(ngDevMode ? [{ debugName: "size" }] : []));
    disabled = input(false, ...(ngDevMode ? [{ debugName: "disabled" }] : []));
    type = input('button', ...(ngDevMode ? [{ debugName: "type" }] : []));
    className = input('', ...(ngDevMode ? [{ debugName: "className", alias: 'class' }] : [{ alias: 'class' }]));
    classes = computed(() => joinClasses(BASE$1, VARIANT[this.variant()], SIZE[this.size()], this.className()), ...(ngDevMode ? [{ debugName: "classes" }] : []));
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: UiButtonComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.4", type: UiButtonComponent, isStandalone: true, selector: "ui-button", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, className: { classPropertyName: "className", publicName: "class", isSignal: true, isRequired: false, transformFunction: null } }, host: { classAttribute: "contents" }, ngImport: i0, template: "<button [attr.type]=\"type()\" [disabled]=\"disabled()\" [class]=\"classes()\">\r\n  <ng-content />\r\n</button>\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: UiButtonComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-button', imports: [], host: {
                        class: 'contents',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<button [attr.type]=\"type()\" [disabled]=\"disabled()\" [class]=\"classes()\">\r\n  <ng-content />\r\n</button>\r\n" }]
        }] });

const NAVIGATION_MENU_CLASSES = {
    root: 'relative z-10 flex max-w-max flex-1 items-center justify-center',
    list: 'group flex flex-1 list-none items-center justify-center gap-1',
    item: 'relative flex',
    trigger: {
        base: 'group w-max bg-background text-foreground [&_svg]:size-3 [&_svg]:transition [&_svg]:duration-300',
        open: 'bg-accent/50 text-accent-foreground hover:bg-accent focus:bg-accent',
    },
    link: 'inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset focus-visible:ring-offset-background',
    indicator: {
        container: 'pointer-events-none absolute left-1/2 top-full z-[1] flex h-1.5 -translate-x-1/2 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in',
        shape: 'relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md',
    },
    viewportWrapper: 'absolute left-0 top-full flex w-full justify-center md:w-auto',
    viewport: 'relative mt-1.5 min-w-[240px] max-w-[90vw] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
    content: 'grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]',
    dropdown: {
        link: 'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        label: 'text-sm font-medium leading-none',
        description: 'text-sm text-muted-foreground line-clamp-2',
    },
};

class UiNavigationMenuComponent {
    hostRef = inject(ElementRef);
    idPrefix = `ui-navigation-${Math.random().toString(36).slice(2)}`;
    items = input([], ...(ngDevMode ? [{ debugName: "items" }] : []));
    className = input('', ...(ngDevMode ? [{ debugName: "className", alias: 'class' }] : [{ alias: 'class' }]));
    ariaLabel = input('Main menu', ...(ngDevMode ? [{ debugName: "ariaLabel", alias: 'aria-label' }] : [{ alias: 'aria-label' }]));
    activeIndexSignal = signal(null, ...(ngDevMode ? [{ debugName: "activeIndexSignal" }] : []));
    activeIndex = this.activeIndexSignal.asReadonly();
    rootClasses = computed(() => joinClasses(NAVIGATION_MENU_CLASSES.root, this.className()), ...(ngDevMode ? [{ debugName: "rootClasses" }] : []));
    listClasses = computed(() => NAVIGATION_MENU_CLASSES.list, ...(ngDevMode ? [{ debugName: "listClasses" }] : []));
    itemClasses = computed(() => NAVIGATION_MENU_CLASSES.item, ...(ngDevMode ? [{ debugName: "itemClasses" }] : []));
    triggerVariant = 'ghost';
    linkClasses = computed(() => NAVIGATION_MENU_CLASSES.link, ...(ngDevMode ? [{ debugName: "linkClasses" }] : []));
    indicatorClasses = computed(() => NAVIGATION_MENU_CLASSES.indicator.container, ...(ngDevMode ? [{ debugName: "indicatorClasses" }] : []));
    indicatorShapeClasses = computed(() => NAVIGATION_MENU_CLASSES.indicator.shape, ...(ngDevMode ? [{ debugName: "indicatorShapeClasses" }] : []));
    viewportWrapperClasses = computed(() => NAVIGATION_MENU_CLASSES.viewportWrapper, ...(ngDevMode ? [{ debugName: "viewportWrapperClasses" }] : []));
    viewportClasses = computed(() => NAVIGATION_MENU_CLASSES.viewport, ...(ngDevMode ? [{ debugName: "viewportClasses" }] : []));
    contentClasses = computed(() => NAVIGATION_MENU_CLASSES.content, ...(ngDevMode ? [{ debugName: "contentClasses" }] : []));
    dropdownLinkClasses = computed(() => NAVIGATION_MENU_CLASSES.dropdown.link, ...(ngDevMode ? [{ debugName: "dropdownLinkClasses" }] : []));
    dropdownLabelClasses = computed(() => NAVIGATION_MENU_CLASSES.dropdown.label, ...(ngDevMode ? [{ debugName: "dropdownLabelClasses" }] : []));
    dropdownDescriptionClasses = computed(() => NAVIGATION_MENU_CLASSES.dropdown.description, ...(ngDevMode ? [{ debugName: "dropdownDescriptionClasses" }] : []));
    activeItem = computed(() => {
        const index = this.activeIndexSignal();
        const entries = this.items();
        if (index === null || index < 0 || index >= entries.length) {
            return null;
        }
        return entries[index] ?? null;
    }, ...(ngDevMode ? [{ debugName: "activeItem" }] : []));
    activeChildren = computed(() => this.activeItem()?.children ?? null, ...(ngDevMode ? [{ debugName: "activeChildren" }] : []));
    hasActiveDropdown = computed(() => (this.activeChildren()?.length ?? 0) > 0, ...(ngDevMode ? [{ debugName: "hasActiveDropdown" }] : []));
    indicatorState = computed(() => this.hasActiveDropdown() ? 'visible' : 'hidden', ...(ngDevMode ? [{ debugName: "indicatorState" }] : []));
    viewportState = computed(() => (this.hasActiveDropdown() ? 'open' : 'closed'), ...(ngDevMode ? [{ debugName: "viewportState" }] : []));
    viewportId = computed(() => {
        const index = this.activeIndexSignal();
        if (index === null) {
            return null;
        }
        return this.resolvePanelId(index);
    }, ...(ngDevMode ? [{ debugName: "viewportId" }] : []));
    viewportLabelId = computed(() => {
        const index = this.activeIndexSignal();
        if (index === null) {
            return null;
        }
        return this.resolveTriggerId(index);
    }, ...(ngDevMode ? [{ debugName: "viewportLabelId" }] : []));
    trackItem = (index, item) => item.id ?? `${item.label}-${index}`;
    trackChild = (index, child) => child.id ?? `${child.label}-${index}`;
    resolveTriggerId(index) {
        return `${this.idPrefix}-trigger-${index}`;
    }
    resolvePanelId(index) {
        return `${this.idPrefix}-panel-${index}`;
    }
    resolveTriggerClasses(index) {
        const isActive = this.activeIndexSignal() === index;
        return joinClasses(NAVIGATION_MENU_CLASSES.trigger.base, isActive ? NAVIGATION_MENU_CLASSES.trigger.open : null);
    }
    openDropdown(index) {
        if (!this.hasChildrenAt(index)) {
            return;
        }
        this.activeIndexSignal.set(index);
    }
    toggleDropdown(index) {
        if (!this.hasChildrenAt(index)) {
            return;
        }
        this.activeIndexSignal.update((current) => (current === index ? null : index));
    }
    closeAll() {
        this.activeIndexSignal.set(null);
    }
    handleHostMouseLeave() {
        this.closeAll();
    }
    handleViewportLeave() {
        this.closeAll();
    }
    handleFocusOut(event) {
        const next = event.relatedTarget;
        if (!next) {
            this.closeAll();
            return;
        }
        if (!this.hostRef.nativeElement.contains(next)) {
            this.closeAll();
        }
    }
    handleLinkInteraction() {
        this.closeAll();
    }
    hasChildrenAt(index) {
        const entry = this.items()[index];
        return !!(entry && entry.children && entry.children.length > 0);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: UiNavigationMenuComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "20.3.4", type: UiNavigationMenuComponent, isStandalone: true, selector: "ui-navigation-menu", inputs: { items: { classPropertyName: "items", publicName: "items", isSignal: true, isRequired: false, transformFunction: null }, className: { classPropertyName: "className", publicName: "class", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "aria-label", isSignal: true, isRequired: false, transformFunction: null } }, host: { listeners: { "mouseleave": "handleHostMouseLeave()", "focusout": "handleFocusOut($event)" }, classAttribute: "contents" }, ngImport: i0, template: "<nav [attr.aria-label]=\"ariaLabel()\" [class]=\"rootClasses()\">\r\n  <ul [class]=\"listClasses()\">\r\n    @for (item of items(); track trackItem($index, item); let index = $index) {\r\n    <li [class]=\"itemClasses()\">\r\n      @if ((item.children?.length ?? 0) > 0) {\r\n      <ui-button\r\n        [variant]=\"triggerVariant\"\r\n        [class]=\"resolveTriggerClasses(index)\"\r\n        [attr.id]=\"resolveTriggerId(index)\"\r\n        [attr.aria-expanded]=\"activeIndex() === index ? 'true' : 'false'\"\r\n        [attr.aria-controls]=\"resolvePanelId(index)\"\r\n        [attr.aria-haspopup]=\"'menu'\"\r\n        [attr.data-state]=\"activeIndex() === index ? 'open' : 'closed'\"\r\n        (pointerover)=\"openDropdown(index)\"\r\n        (focus)=\"openDropdown(index)\"\r\n        (click)=\"toggleDropdown(index)\"\r\n      >\r\n        <span>{{ item.label }}</span>\r\n        <svg\r\n          aria-hidden=\"true\"\r\n          focusable=\"false\"\r\n          viewBox=\"0 0 24 24\"\r\n          class=\"relative top-[1px] transition duration-300\"\r\n          [class.rotate-180]=\"activeIndex() === index\"\r\n        >\r\n          <path\r\n            d=\"M6 9l6 6 6-6\"\r\n            fill=\"none\"\r\n            stroke=\"currentColor\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"2\"\r\n          />\r\n        </svg>\r\n      </ui-button>\r\n\r\n      <div\r\n        [class]=\"indicatorClasses()\"\r\n        [attr.data-state]=\"activeIndex() === index ? 'visible' : 'hidden'\"\r\n      >\r\n        <div [class]=\"indicatorShapeClasses()\"></div>\r\n      </div>\r\n      } @else {\r\n      <a\r\n        [class]=\"linkClasses()\"\r\n        [attr.id]=\"resolveTriggerId(index)\"\r\n        [attr.href]=\"item.href ?? '#'\"\r\n        [attr.target]=\"item.external ? '_blank' : null\"\r\n        [attr.rel]=\"item.external ? 'noreferrer noopener' : null\"\r\n        (focus)=\"handleLinkInteraction()\"\r\n        (pointerenter)=\"handleLinkInteraction()\"\r\n        (click)=\"handleLinkInteraction()\"\r\n      >\r\n        {{ item.label }}\r\n      </a>\r\n      }\r\n    </li>\r\n    }\r\n  </ul>\r\n\r\n  @if (hasActiveDropdown()) {\r\n  <div [class]=\"viewportWrapperClasses()\" (mouseleave)=\"handleViewportLeave()\">\r\n    <div\r\n      [class]=\"viewportClasses()\"\r\n      [attr.data-state]=\"viewportState()\"\r\n      [attr.id]=\"viewportId()\"\r\n      role=\"region\"\r\n      [attr.aria-labelledby]=\"viewportLabelId()\"\r\n    >\r\n      <div [class]=\"contentClasses()\">\r\n        @for (child of activeChildren(); track trackChild($index, child); let childIndex = $index) {\r\n        <a\r\n          [class]=\"dropdownLinkClasses()\"\r\n          [attr.href]=\"child.href\"\r\n          [attr.target]=\"child.external ? '_blank' : null\"\r\n          [attr.rel]=\"child.external ? 'noreferrer noopener' : null\"\r\n        >\r\n          <div [class]=\"dropdownLabelClasses()\">{{ child.label }}</div>\r\n          @if (child.description) {\r\n          <p [class]=\"dropdownDescriptionClasses()\">{{ child.description }}</p>\r\n          }\r\n        </a>\r\n        }\r\n      </div>\r\n    </div>\r\n  </div>\r\n  }\r\n</nav>\r\n", dependencies: [{ kind: "component", type: UiButtonComponent, selector: "ui-button", inputs: ["variant", "size", "disabled", "type", "class"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: UiNavigationMenuComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-navigation-menu', imports: [UiButtonComponent], host: {
                        class: 'contents',
                        '(mouseleave)': 'handleHostMouseLeave()',
                        '(focusout)': 'handleFocusOut($event)',
                    }, changeDetection: ChangeDetectionStrategy.OnPush, template: "<nav [attr.aria-label]=\"ariaLabel()\" [class]=\"rootClasses()\">\r\n  <ul [class]=\"listClasses()\">\r\n    @for (item of items(); track trackItem($index, item); let index = $index) {\r\n    <li [class]=\"itemClasses()\">\r\n      @if ((item.children?.length ?? 0) > 0) {\r\n      <ui-button\r\n        [variant]=\"triggerVariant\"\r\n        [class]=\"resolveTriggerClasses(index)\"\r\n        [attr.id]=\"resolveTriggerId(index)\"\r\n        [attr.aria-expanded]=\"activeIndex() === index ? 'true' : 'false'\"\r\n        [attr.aria-controls]=\"resolvePanelId(index)\"\r\n        [attr.aria-haspopup]=\"'menu'\"\r\n        [attr.data-state]=\"activeIndex() === index ? 'open' : 'closed'\"\r\n        (pointerover)=\"openDropdown(index)\"\r\n        (focus)=\"openDropdown(index)\"\r\n        (click)=\"toggleDropdown(index)\"\r\n      >\r\n        <span>{{ item.label }}</span>\r\n        <svg\r\n          aria-hidden=\"true\"\r\n          focusable=\"false\"\r\n          viewBox=\"0 0 24 24\"\r\n          class=\"relative top-[1px] transition duration-300\"\r\n          [class.rotate-180]=\"activeIndex() === index\"\r\n        >\r\n          <path\r\n            d=\"M6 9l6 6 6-6\"\r\n            fill=\"none\"\r\n            stroke=\"currentColor\"\r\n            stroke-linecap=\"round\"\r\n            stroke-linejoin=\"round\"\r\n            stroke-width=\"2\"\r\n          />\r\n        </svg>\r\n      </ui-button>\r\n\r\n      <div\r\n        [class]=\"indicatorClasses()\"\r\n        [attr.data-state]=\"activeIndex() === index ? 'visible' : 'hidden'\"\r\n      >\r\n        <div [class]=\"indicatorShapeClasses()\"></div>\r\n      </div>\r\n      } @else {\r\n      <a\r\n        [class]=\"linkClasses()\"\r\n        [attr.id]=\"resolveTriggerId(index)\"\r\n        [attr.href]=\"item.href ?? '#'\"\r\n        [attr.target]=\"item.external ? '_blank' : null\"\r\n        [attr.rel]=\"item.external ? 'noreferrer noopener' : null\"\r\n        (focus)=\"handleLinkInteraction()\"\r\n        (pointerenter)=\"handleLinkInteraction()\"\r\n        (click)=\"handleLinkInteraction()\"\r\n      >\r\n        {{ item.label }}\r\n      </a>\r\n      }\r\n    </li>\r\n    }\r\n  </ul>\r\n\r\n  @if (hasActiveDropdown()) {\r\n  <div [class]=\"viewportWrapperClasses()\" (mouseleave)=\"handleViewportLeave()\">\r\n    <div\r\n      [class]=\"viewportClasses()\"\r\n      [attr.data-state]=\"viewportState()\"\r\n      [attr.id]=\"viewportId()\"\r\n      role=\"region\"\r\n      [attr.aria-labelledby]=\"viewportLabelId()\"\r\n    >\r\n      <div [class]=\"contentClasses()\">\r\n        @for (child of activeChildren(); track trackChild($index, child); let childIndex = $index) {\r\n        <a\r\n          [class]=\"dropdownLinkClasses()\"\r\n          [attr.href]=\"child.href\"\r\n          [attr.target]=\"child.external ? '_blank' : null\"\r\n          [attr.rel]=\"child.external ? 'noreferrer noopener' : null\"\r\n        >\r\n          <div [class]=\"dropdownLabelClasses()\">{{ child.label }}</div>\r\n          @if (child.description) {\r\n          <p [class]=\"dropdownDescriptionClasses()\">{{ child.description }}</p>\r\n          }\r\n        </a>\r\n        }\r\n      </div>\r\n    </div>\r\n  </div>\r\n  }\r\n</nav>\r\n" }]
        }] });

const TEXTBOX_SIZE = {
    default: 'h-9 px-3 py-1 text-base md:text-sm',
    sm: 'h-8 px-3 text-sm',
    lg: 'h-10 px-4 text-base',
};

const TEXTBOX_VARIANT = {
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
};

const BASE = 'flex w-full min-w-0 rounded-md border border-input bg-transparent transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50 focus-visible:ring-offset focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground';
const createTextboxId = () => `ui-textbox-${Math.random().toString(36).slice(2)}`;
class UiTextboxComponent {
    internalId = createTextboxId();
    variant = input('default', ...(ngDevMode ? [{ debugName: "variant" }] : []));
    size = input('default', ...(ngDevMode ? [{ debugName: "size" }] : []));
    type = input(null, ...(ngDevMode ? [{ debugName: "type" }] : []));
    className = input('', ...(ngDevMode ? [{ debugName: "className", alias: 'class' }] : [{ alias: 'class' }]));
    placeholder = input(null, ...(ngDevMode ? [{ debugName: "placeholder" }] : []));
    name = input(null, ...(ngDevMode ? [{ debugName: "name" }] : []));
    id = input(null, ...(ngDevMode ? [{ debugName: "id" }] : []));
    autocomplete = input(null, ...(ngDevMode ? [{ debugName: "autocomplete" }] : []));
    autocapitalize = input(null, ...(ngDevMode ? [{ debugName: "autocapitalize" }] : []));
    autocorrect = input(null, ...(ngDevMode ? [{ debugName: "autocorrect" }] : []));
    inputmode = input(null, ...(ngDevMode ? [{ debugName: "inputmode" }] : []));
    min = input(null, ...(ngDevMode ? [{ debugName: "min" }] : []));
    max = input(null, ...(ngDevMode ? [{ debugName: "max" }] : []));
    step = input(null, ...(ngDevMode ? [{ debugName: "step" }] : []));
    minlength = input(null, ...(ngDevMode ? [{ debugName: "minlength" }] : []));
    maxlength = input(null, ...(ngDevMode ? [{ debugName: "maxlength" }] : []));
    pattern = input(null, ...(ngDevMode ? [{ debugName: "pattern" }] : []));
    accept = input(null, ...(ngDevMode ? [{ debugName: "accept" }] : []));
    multiple = input(false, ...(ngDevMode ? [{ debugName: "multiple", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    ariaLabel = input(null, ...(ngDevMode ? [{ debugName: "ariaLabel", alias: 'aria-label' }] : [{ alias: 'aria-label' }]));
    ariaDescribedby = input(null, ...(ngDevMode ? [{ debugName: "ariaDescribedby", alias: 'aria-describedby' }] : [{ alias: 'aria-describedby' }]));
    ariaInvalid = input(null, ...(ngDevMode ? [{ debugName: "ariaInvalid", alias: 'aria-invalid' }] : [{ alias: 'aria-invalid' }]));
    autofocus = input(false, ...(ngDevMode ? [{ debugName: "autofocus", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    required = input(false, ...(ngDevMode ? [{ debugName: "required", transform: booleanAttribute }] : [{ transform: booleanAttribute }]));
    readonlyInput = input(false, ...(ngDevMode ? [{ debugName: "readonlyInput", alias: 'readonly', transform: booleanAttribute }] : [{ alias: 'readonly', transform: booleanAttribute }]));
    disabledInput = input(false, ...(ngDevMode ? [{ debugName: "disabledInput", alias: 'disabled', transform: booleanAttribute }] : [{ alias: 'disabled', transform: booleanAttribute }]));
    valueSignal = signal('', ...(ngDevMode ? [{ debugName: "valueSignal" }] : []));
    disabledFromControl = signal(false, ...(ngDevMode ? [{ debugName: "disabledFromControl" }] : []));
    value = this.valueSignal.asReadonly();
    onChange = () => { };
    onTouched = () => { };
    config = computed(() => TEXTBOX_VARIANT[this.variant()], ...(ngDevMode ? [{ debugName: "config" }] : []));
    controlId = computed(() => this.id() ?? this.internalId, ...(ngDevMode ? [{ debugName: "controlId" }] : []));
    resolvedType = computed(() => this.type() ?? this.config().type, ...(ngDevMode ? [{ debugName: "resolvedType" }] : []));
    resolvedPlaceholder = computed(() => {
        const manual = this.placeholder();
        if (manual !== null) {
            return manual;
        }
        return this.config().placeholder ?? null;
    }, ...(ngDevMode ? [{ debugName: "resolvedPlaceholder" }] : []));
    classes = computed(() => joinClasses(BASE, TEXTBOX_SIZE[this.size()], this.config().className ?? null, this.className()), ...(ngDevMode ? [{ debugName: "classes" }] : []));
    isFile = computed(() => this.resolvedType() === 'file', ...(ngDevMode ? [{ debugName: "isFile" }] : []));
    isDisabled = computed(() => this.disabledInput() || this.disabledFromControl() || this.config().disabled === true, ...(ngDevMode ? [{ debugName: "isDisabled" }] : []));
    isReadonly = computed(() => this.readonlyInput(), ...(ngDevMode ? [{ debugName: "isReadonly" }] : []));
    handleInput(event) {
        const target = event.target;
        if (this.isFile()) {
            const files = target.files;
            this.valueSignal.set('');
            this.onChange(files && files.length > 0 ? files : null);
            return;
        }
        const nextValue = target.value;
        this.valueSignal.set(nextValue);
        this.onChange(nextValue);
    }
    handleBlur() {
        this.onTouched();
    }
    writeValue(value) {
        if (value instanceof FileList) {
            this.valueSignal.set('');
            return;
        }
        if (typeof value === 'string') {
            this.valueSignal.set(value);
            return;
        }
        if (value === null || value === undefined) {
            this.valueSignal.set('');
            return;
        }
        this.valueSignal.set(String(value));
    }
    registerOnChange(fn) {
        this.onChange = (value) => fn(value);
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.disabledFromControl.set(isDisabled);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: UiTextboxComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.1.0", version: "20.3.4", type: UiTextboxComponent, isStandalone: true, selector: "ui-textbox", inputs: { variant: { classPropertyName: "variant", publicName: "variant", isSignal: true, isRequired: false, transformFunction: null }, size: { classPropertyName: "size", publicName: "size", isSignal: true, isRequired: false, transformFunction: null }, type: { classPropertyName: "type", publicName: "type", isSignal: true, isRequired: false, transformFunction: null }, className: { classPropertyName: "className", publicName: "class", isSignal: true, isRequired: false, transformFunction: null }, placeholder: { classPropertyName: "placeholder", publicName: "placeholder", isSignal: true, isRequired: false, transformFunction: null }, name: { classPropertyName: "name", publicName: "name", isSignal: true, isRequired: false, transformFunction: null }, id: { classPropertyName: "id", publicName: "id", isSignal: true, isRequired: false, transformFunction: null }, autocomplete: { classPropertyName: "autocomplete", publicName: "autocomplete", isSignal: true, isRequired: false, transformFunction: null }, autocapitalize: { classPropertyName: "autocapitalize", publicName: "autocapitalize", isSignal: true, isRequired: false, transformFunction: null }, autocorrect: { classPropertyName: "autocorrect", publicName: "autocorrect", isSignal: true, isRequired: false, transformFunction: null }, inputmode: { classPropertyName: "inputmode", publicName: "inputmode", isSignal: true, isRequired: false, transformFunction: null }, min: { classPropertyName: "min", publicName: "min", isSignal: true, isRequired: false, transformFunction: null }, max: { classPropertyName: "max", publicName: "max", isSignal: true, isRequired: false, transformFunction: null }, step: { classPropertyName: "step", publicName: "step", isSignal: true, isRequired: false, transformFunction: null }, minlength: { classPropertyName: "minlength", publicName: "minlength", isSignal: true, isRequired: false, transformFunction: null }, maxlength: { classPropertyName: "maxlength", publicName: "maxlength", isSignal: true, isRequired: false, transformFunction: null }, pattern: { classPropertyName: "pattern", publicName: "pattern", isSignal: true, isRequired: false, transformFunction: null }, accept: { classPropertyName: "accept", publicName: "accept", isSignal: true, isRequired: false, transformFunction: null }, multiple: { classPropertyName: "multiple", publicName: "multiple", isSignal: true, isRequired: false, transformFunction: null }, ariaLabel: { classPropertyName: "ariaLabel", publicName: "aria-label", isSignal: true, isRequired: false, transformFunction: null }, ariaDescribedby: { classPropertyName: "ariaDescribedby", publicName: "aria-describedby", isSignal: true, isRequired: false, transformFunction: null }, ariaInvalid: { classPropertyName: "ariaInvalid", publicName: "aria-invalid", isSignal: true, isRequired: false, transformFunction: null }, autofocus: { classPropertyName: "autofocus", publicName: "autofocus", isSignal: true, isRequired: false, transformFunction: null }, required: { classPropertyName: "required", publicName: "required", isSignal: true, isRequired: false, transformFunction: null }, readonlyInput: { classPropertyName: "readonlyInput", publicName: "readonly", isSignal: true, isRequired: false, transformFunction: null }, disabledInput: { classPropertyName: "disabledInput", publicName: "disabled", isSignal: true, isRequired: false, transformFunction: null } }, host: { classAttribute: "contents" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: UiTextboxComponent,
                multi: true,
            },
        ], ngImport: i0, template: "<input\r\n  [attr.id]=\"controlId()\"\r\n  [attr.type]=\"resolvedType()\"\r\n  [attr.name]=\"name() ?? null\"\r\n  [attr.placeholder]=\"resolvedPlaceholder() ?? null\"\r\n  [attr.autocomplete]=\"autocomplete() ?? null\"\r\n  [attr.autocapitalize]=\"autocapitalize() ?? null\"\r\n  [attr.autocorrect]=\"autocorrect() ?? null\"\r\n  [attr.inputmode]=\"inputmode() ?? null\"\r\n  [attr.min]=\"min() ?? null\"\r\n  [attr.max]=\"max() ?? null\"\r\n  [attr.step]=\"step() ?? null\"\r\n  [attr.minlength]=\"minlength() ?? null\"\r\n  [attr.maxlength]=\"maxlength() ?? null\"\r\n  [attr.pattern]=\"pattern() ?? null\"\r\n  [attr.accept]=\"isFile() ? accept() ?? null : null\"\r\n  [attr.multiple]=\"isFile() && multiple() ? '' : null\"\r\n  [attr.aria-label]=\"ariaLabel() ?? null\"\r\n  [attr.aria-describedby]=\"ariaDescribedby() ?? null\"\r\n  [attr.aria-invalid]=\"ariaInvalid() ?? null\"\r\n  [attr.autofocus]=\"autofocus() ? '' : null\"\r\n  [attr.required]=\"required() ? '' : null\"\r\n  [attr.readonly]=\"isReadonly() ? '' : null\"\r\n  [disabled]=\"isDisabled()\"\r\n  [class]=\"classes()\"\r\n  [value]=\"isFile() ? undefined : value()\"\r\n  (input)=\"handleInput($event)\"\r\n  (change)=\"handleInput($event)\"\r\n  (blur)=\"handleBlur()\"\r\n/>\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.4", ngImport: i0, type: UiTextboxComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ui-textbox', imports: [], host: {
                        class: 'contents',
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: UiTextboxComponent,
                            multi: true,
                        },
                    ], changeDetection: ChangeDetectionStrategy.OnPush, template: "<input\r\n  [attr.id]=\"controlId()\"\r\n  [attr.type]=\"resolvedType()\"\r\n  [attr.name]=\"name() ?? null\"\r\n  [attr.placeholder]=\"resolvedPlaceholder() ?? null\"\r\n  [attr.autocomplete]=\"autocomplete() ?? null\"\r\n  [attr.autocapitalize]=\"autocapitalize() ?? null\"\r\n  [attr.autocorrect]=\"autocorrect() ?? null\"\r\n  [attr.inputmode]=\"inputmode() ?? null\"\r\n  [attr.min]=\"min() ?? null\"\r\n  [attr.max]=\"max() ?? null\"\r\n  [attr.step]=\"step() ?? null\"\r\n  [attr.minlength]=\"minlength() ?? null\"\r\n  [attr.maxlength]=\"maxlength() ?? null\"\r\n  [attr.pattern]=\"pattern() ?? null\"\r\n  [attr.accept]=\"isFile() ? accept() ?? null : null\"\r\n  [attr.multiple]=\"isFile() && multiple() ? '' : null\"\r\n  [attr.aria-label]=\"ariaLabel() ?? null\"\r\n  [attr.aria-describedby]=\"ariaDescribedby() ?? null\"\r\n  [attr.aria-invalid]=\"ariaInvalid() ?? null\"\r\n  [attr.autofocus]=\"autofocus() ? '' : null\"\r\n  [attr.required]=\"required() ? '' : null\"\r\n  [attr.readonly]=\"isReadonly() ? '' : null\"\r\n  [disabled]=\"isDisabled()\"\r\n  [class]=\"classes()\"\r\n  [value]=\"isFile() ? undefined : value()\"\r\n  (input)=\"handleInput($event)\"\r\n  (change)=\"handleInput($event)\"\r\n  (blur)=\"handleBlur()\"\r\n/>\r\n" }]
        }] });

const TEXTBOX_INPUT_TYPES = [
    'text',
    'email',
    'password',
    'search',
    'tel',
    'url',
    'number',
    'time',
    'date',
    'datetime-local',
    'month',
    'week',
    'color',
    'file',
];

/**
 * Generated bundle index. Do not edit.
 */

export { NAVIGATION_MENU_CLASSES, SIZE, TEXTBOX_INPUT_TYPES, TEXTBOX_SIZE, TEXTBOX_VARIANT, UiButtonComponent, UiNavigationMenuComponent, UiTextboxComponent, VARIANT };
//# sourceMappingURL=ui.mjs.map
