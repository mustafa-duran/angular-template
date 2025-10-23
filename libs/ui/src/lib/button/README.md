# @ui/button

shadcn/ui'den esinlenen Angular button komponenti. Signal-based reaktif yapı ve Tailwind CSS ile stillendirilmiştir.

## 📦 İçerik

- **ButtonComponent** - Çoklu variant ve size desteği olan button komponenti
- **ButtonVariant** - 6 farklı görsel stil (default, destructive, outline, secondary, ghost, link)
- **ButtonSize** - 4 farklı boyut (default, sm, lg, icon)

## 🚀 Kullanım

### Import

```typescript
import { ButtonComponent } from '@ui/button';

@Component({
  selector: 'app-example',
  imports: [ButtonComponent],
  template: `<ui-button>Click me</ui-button>`
})
export class ExampleComponent {}
```

### Temel Kullanım

```html
<!-- Default button -->
<ui-button>Click me</ui-button>

<!-- Submit button -->
<ui-button type="submit">Submit</ui-button>

<!-- Disabled button -->
<ui-button [disabled]="true">Disabled</ui-button>
```

### Variants

```html
<!-- Default (primary) -->
<ui-button variant="default">Default</ui-button>

<!-- Destructive (kırmızı) -->
<ui-button variant="destructive">Delete</ui-button>

<!-- Outline (çerçeveli) -->
<ui-button variant="outline">Outline</ui-button>

<!-- Secondary (ikincil) -->
<ui-button variant="secondary">Secondary</ui-button>

<!-- Ghost (transparan) -->
<ui-button variant="ghost">Ghost</ui-button>

<!-- Link (bağlantı) -->
<ui-button variant="link">Link</ui-button>
```

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
```

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

## 🎯 Özellikler

- ✅ **Signal-based** - Modern Angular reactive patterns
- ✅ **6 Variants** - Farklı kullanım senaryoları için stiller
- ✅ **4 Sizes** - Esnek boyutlandırma seçenekleri
- ✅ **RouterLink** - Angular routing desteği
- ✅ **Accessibility** - ARIA attributes ve keyboard navigation
- ✅ **Type-safe** - TypeScript ile tam tip güvenliği
- ✅ **Customizable** - Custom class desteği
- ✅ **Tailwind CSS** - Utility-first styling

## 📁 Dosya Yapısı

```
button/
├── button.component.ts    # Ana component
├── button.constants.ts    # CSS class tanımları
├── button.html            # Template
├── button.types.ts        # Type tanımları
└── index.ts              # Public API
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

### Types

```typescript
type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';

type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';
```

## 🎨 Customization

Button renkleri CSS değişkenleri ile kontrol edilir:

```css
--primary
--primary-foreground
--destructive
--destructive-foreground
--secondary
--secondary-foreground
--accent
--accent-foreground
--border
--input
--ring
```

Bu değişkenler `global.css` dosyasında tanımlanmıştır ve tema değişikliklerini destekler.
