# @ui/select

Dropdown select komponenti.

## Kullanım

```typescript
import { SelectComponent, SelectOption } from '@ui/select';

@Component({
  imports: [SelectComponent],
  template: `
    <ui-select
      [options]="options"
      [selectedValue]="selected"
      placeholder="Seçiniz"
      (selectionChange)="onSelect($event)"
    />
  `
})
export class MyComponent {
  options: SelectOption[] = [
    { value: 'tr', label: 'Türkçe' },
    { value: 'en', label: 'English' }
  ];

  selected = 'tr';

  onSelect(value: string) {
    console.log(value);
  }
}
```

## API

**Inputs:**

- `options` - Seçenek listesi
- `selectedValue` - Seçili değer
- `placeholder` - Placeholder metni

**Outputs:**

- `selectionChange` - Değer değiştiğinde (string)
- `optionSelected` - Değer değiştiğinde (SelectOption)

## Types

```typescript
interface SelectOption {
  value: string;
  label: string;
}
```
