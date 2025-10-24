# @ui/dialog

Modal dialog komponenti.

## Kullanım

```typescript
import { Component, signal } from '@angular/core';
import {
  DialogComponent,
  DialogHeaderComponent,
  DialogFooterComponent,
  DialogTitleComponent,
  DialogDescriptionComponent
} from '@ui/dialog';
import { ButtonComponent } from '@ui/button';

@Component({
  imports: [
    DialogComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    ButtonComponent
  ],
  template: `
    <ui-button (click)="dialogOpen.set(true)">Open Dialog</ui-button>

    <ui-dialog [(open)]="dialogOpen">
      <ui-dialog-header>
        <ui-dialog-title>Edit profile</ui-dialog-title>
        <ui-dialog-description>
          Make changes to your profile here. Click save when you're done.
        </ui-dialog-description>
      </ui-dialog-header>

      <div class="grid gap-4 py-4">
        <!-- Your content here -->
      </div>

      <ui-dialog-footer>
        <ui-button variant="outline" (click)="dialogOpen.set(false)"> Cancel </ui-button>
        <ui-button (click)="save()">Save changes</ui-button>
      </ui-dialog-footer>
    </ui-dialog>
  `
})
export class MyComponent {
  dialogOpen = signal(false);

  save() {
    // Save logic
    this.dialogOpen.set(false);
  }
}
```

## Components

- `ui-dialog` - Ana dialog container
- `ui-dialog-header` - Dialog başlık alanı
- `ui-dialog-footer` - Dialog alt buton alanı
- `ui-dialog-title` - Dialog başlığı
- `ui-dialog-description` - Dialog açıklaması

## API

**Inputs:**

- `open` - Dialog açık mı? (two-way binding)
- `showCloseButton` - X butonu gösterilsin mi? (default: true)

**Outputs:**

- `openChange` - Dialog durumu değiştiğinde
