# @ui/button

Angular için şık ve yeniden kullanılabilir bir button komponenti.

## Kullanım

```typescript
import { Component, signal } from '@angular/core';
import { ButtonComponent } from '@ui/button';

@Component({
  imports: [ButtonComponent],
  template: `
    <ui-button (click)="save()">Save changes</ui-button>
    <ui-button variant="secondary" (click)="dialogOpen.set(false)">Cancel</ui-button>
    <ui-button variant="destructive" [disabled]="loading()">Delete</ui-button>
    <ui-button size="icon">
      <svg class="h-4 w-4" viewBox="0 0 24 24"><path d="M5 12h14" /></svg>
    </ui-button>
  `
})
export class MyComponent {
  loading = signal(false);
  dialogOpen = signal(false);

  save(): void {
    // işlem
  }
}
```

## Seçenekler

- `variant`: `default` · `destructive` · `outline` · `secondary` · `ghost` · `link`
- `size`: `default` · `sm` · `lg` · `icon`

## API

- `variant: ButtonVariant = 'default'`
- `size: ButtonSize = 'default'`
- `disabled: boolean = false`
- `type: 'button' | 'submit' | 'reset' = 'button'`
- `class: string = ''`

Router navigation desteği için `routerLink` kullanılabilir, ek sınıflar için `class` input'u yeterlidir.
