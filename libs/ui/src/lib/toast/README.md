# Toast Component

An opinionated toast notification system for Angular, inspired by shadcn/ui's Sonner.

## Installation

This component is part of the `@libs/ui` package. No external packages required.

## Usage

### 1. Add the component to your app

Add the `ToastComponent` to your root layout (usually `app.ts` and `app.html`):

```typescript
// app.ts
import { Component } from '@angular/core';
import { ToastComponent } from '@ui/toast';

@Component({
  selector: 'app-root',
  template: './app.html',
  imports: [ToastComponent]
})
export class App {}
```

```html
<!-- app.html -->
<router-outlet />
<ui-toast position="top-center" [visibleToasts]="5" />
```

### 2. Use the service to show toasts

Inject `ToastService` into any component to show toasts:

```typescript
import { Component, inject } from '@angular/core';
import { ToastService } from '@libs/ui';

@Component({
  selector: 'app-example',
  template: ` <button (click)="showToast()">Show Toast</button> `
})
export class ExampleComponent {
  private toast = inject(ToastService);

  showToast() {
    this.toast.success('Event has been created');
  }
}
```

## API

### Service Methods

#### `toast(title, options?)`

Show a default toast.

```typescript
toast.toast('Event has been created');
```

#### `success(title, options?)`

Show a success toast.

```typescript
toast.success('Event has been created');
```

#### `error(title, options?)`

Show an error toast.

```typescript
toast.error('Event has not been created');
```

#### `warning(title, options?)`

Show a warning toast.

```typescript
toast.warning('Event has a warning');
```

#### `info(title, options?)`

Show an info toast.

```typescript
toast.info('Be at the area 10 minutes before the event time');
```

#### `loading(title, options?)`

Show a loading toast (does not auto-dismiss).

```typescript
const toastId = toast.loading('Loading...');
// Later dismiss it
toast.dismiss(toastId);
```

#### `promise(promise, options)`

Show a loading toast that updates based on promise state.

```typescript
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Data loaded',
  error: 'Failed to load data'
});
```

#### `dismiss(id)`

Dismiss a specific toast.

```typescript
const id = toast.success('Success');
toast.dismiss(id);
```

#### `dismissAll()`

Dismiss all toasts.

```typescript
toast.dismissAll();
```

### Toast Options

```typescript
interface ToastOptions {
  type?: 'default' | 'success' | 'error' | 'warning' | 'info' | 'loading';
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  cancel?: {
    label: string;
    onClick: () => void;
  };
  duration?: number; // in milliseconds, default 4000
  dismissible?: boolean; // default true
  className?: string;
}
```

### Component Inputs

```typescript
// Position of toasts
position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

// Expand toasts on hover
expand?: boolean;

// Maximum visible toasts
visibleToasts?: number;

// Show close button
closeButton?: boolean;

// Use rich colors for toast types
richColors?: boolean;

// Distance from edge of screen
offset?: string;

// Text direction
dir?: 'ltr' | 'rtl' | 'auto';

// Theme
theme?: 'light' | 'dark' | 'system';

// Gap between toasts
gap?: number;

// Custom class name
className?: string;
```

## Examples

### With Description

```typescript
toast.success('Event has been created', {
  description: 'Sunday, December 03, 2023 at 9:00 AM'
});
```

### With Action

```typescript
toast.toast('Event has been created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo')
  }
});
```

### With Cancel

```typescript
toast.toast('Event has been created', {
  cancel: {
    label: 'Dismiss',
    onClick: () => console.log('Dismissed')
  }
});
```

### Custom Duration

```typescript
toast.success('Event created', {
  duration: 10000 // 10 seconds
});
```

### Promise Example

```typescript
const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

toast.promise(promise(), {
  loading: 'Loading...',
  success: (data) => 'Success!',
  error: (error) => 'Error: ' + error.message
});
```

### Update Toast

```typescript
const id = toast.loading('Loading...');

// Later update it
toast.update(id, {
  type: 'success',
  title: 'Loaded successfully',
  duration: 2000
});
```

## Styling

The component uses Tailwind CSS classes and inherits from your global CSS variables defined in `global.css`. You can customize the appearance by:

1. Modifying CSS variables in your `global.css`
2. Passing custom `className` to individual toasts
3. Setting `richColors={true}` for colored toast backgrounds based on type

## Configuration

Configure default behavior globally:

```typescript
export class App {
  private toast = inject(ToastService);

  constructor() {
    this.toast.configure({
      position: 'top-right',
      duration: 5000,
      richColors: true
    });
  }
}
```
