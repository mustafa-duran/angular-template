# @ui/button

shadcn/ui tarzı button komponenti. 6 variant, 4 size seçeneği.

## 🚀 Kullanım

```typescript
import { ButtonComponent } from '@ui/button';

@Component({
  imports: [ButtonComponent],
  template: `<ui-button>Click</ui-button>`
})
```

### Variants

````html
```html
<ui-button variant="default">Default</ui-button>
<ui-button variant="destructive">Delete</ui-button>
<ui-button variant="outline">Outline</ui-button>
<ui-button variant="secondary">Secondary</ui-button>
<ui-button variant="ghost">Ghost</ui-button>
<ui-button variant="link">Link</ui-button>
````

### Sizes

```html
<ui-button size="sm">Small</ui-button>
<ui-button size="default">Default</ui-button>
<ui-button size="lg">Large</ui-button>
<ui-button size="icon"><svg>...</svg></ui-button>
```

### Diğer

```html
<!-- Disabled -->
<ui-button [disabled]="true">Disabled</ui-button>

<!-- RouterLink -->
<ui-button routerLink="/home">Home</ui-button>

<!-- Custom class -->
<ui-button class="w-full">Full width</ui-button>

<!-- Form -->
<ui-button type="submit">Submit</ui-button>
```

````

### Sizes

```html
<!-- Small -->
<ui-button size="sm">Small</ui-button>

<!-- Default -->
<ui-button size="default">Default</ui-button>

<!-- Large -->
<ui-button size="lg">Large</ui-button>

<!-- Icon (kare) -->
<ui-button size="icon">
  <svg>...</svg>
</ui-button>
````

### RouterLink ile Kullanım

```html
<!-- Internal navigation -->
<ui-button routerLink="/home">Home</ui-button>

<!-- Query params ile -->
<ui-button routerLink="/users" [queryParams]="{ page: 1 }">Users</ui-button>

<!-- Fragment ile -->
<ui-button routerLink="/about" fragment="team">About</ui-button>

<!-- External link (native href) -->
<ui-button href="https://example.com">External</ui-button>
```

### Custom Class ile

```html
<ui-button class="w-full">Full width button</ui-button>
<ui-button class="min-w-32">Min width button</ui-button>
```

### Component'te Kullanım

```typescript
import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@ui/button';

@Component({
  selector: 'app-form',
  imports: [ButtonComponent],
  template: `
    <ui-button variant="destructive" [disabled]="loading()" (click)="handleDelete()">
      Delete
    </ui-button>
  `
})
export class FormComponent {
  loading = signal(false);

  async handleDelete() {
    this.loading.set(true);
    // Delete logic...
    this.loading.set(false);
  }
}
```

### Types

```typescript
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
```

## 🔧 API

### Inputs

| Input      | Type                              | Default     | Açıklama          |
| ---------- | --------------------------------- | ----------- | ----------------- |
| `variant`  | `ButtonVariant`                   | `'default'` | Button stili      |
| `size`     | `ButtonSize`                      | `'default'` | Button boyutu     |
| `disabled` | `boolean`                         | `false`     | Disabled durumu   |
| `type`     | `'button' \| 'submit' \| 'reset'` | `'button'`  | HTML button type  |
| `class`    | `string`                          | `''`        | Ek CSS class'ları |
