# @ui/select

Signal tabanlı dropdown select komponenti.

## Kullanım

```typescript
import { Component, signal } from '@angular/core';
import { SelectComponent, SelectOption } from '@ui/select';

@Component({
  imports: [SelectComponent],
  template: `
    <ui-select
      [options]="languageOptions"
      [selectedValue]="activeLanguage()"
      placeholder="Dil seçiniz"
      (selectionChange)="setLanguage($event)"
      (optionSelected)="logOption($event)"
    />
  `
})
export class LanguageSelectComponent {
  readonly languageOptions: SelectOption[] = [
    { value: 'tr', label: 'Türkçe' },
    { value: 'en', label: 'English' },
    { value: 'de', label: 'Deutsch' }
  ];

  activeLanguage = signal<string | null>('tr');

  setLanguage(code: string): void {
    this.activeLanguage.set(code);
  }

  logOption(option: SelectOption): void {
    console.log(option);
  }
}
```

## API

- `options: ReadonlyArray<SelectOption>`
- `selectedValue: string | null`
- `placeholder: string = 'Select an option'`
- `selectionChange: EventEmitter<string>`
- `optionSelected: EventEmitter<SelectOption>`

`SelectOption` tipi `{ value: string; label: string; }` şeklindedir.
