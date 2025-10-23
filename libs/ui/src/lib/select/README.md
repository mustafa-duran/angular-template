# @ui/select

Özelleştirilebilir dropdown select komponenti. Signal-based reaktif yapı ve Tailwind CSS ile stillendirilmiştir.

## 📦 İçerik

- **SelectComponent** - Dropdown seçim komponenti
- **SelectOption** - Seçenek interface'i

## 🚀 Kullanım

### Import

```typescript
import { SelectComponent, SelectOption } from '@ui/select';

@Component({
  selector: 'app-example',
  imports: [SelectComponent],
  template: `
    <ui-select
      [options]="options"
      [selectedValue]="selectedValue"
      (selectionChange)="onSelect($event)"
    />
  `
})
export class ExampleComponent {
  options: SelectOption[] = [
    { value: 'en', label: 'English' },
    { value: 'tr', label: 'Türkçe' }
  ];
  selectedValue = 'en';

  onSelect(value: string) {
    this.selectedValue = value;
  }
}
```

### Temel Kullanım

```typescript
import { Component } from '@angular/core';
import { SelectComponent, SelectOption } from '@ui/select';

@Component({
  selector: 'app-form',
  imports: [SelectComponent],
  template: `
    <ui-select
      [options]="countries"
      [selectedValue]="selectedCountry"
      placeholder="Select a country"
      (selectionChange)="onCountryChange($event)"
    />
  `
})
export class FormComponent {
  countries: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'tr', label: 'Turkey' },
    { value: 'de', label: 'Germany' }
  ];

  selectedCountry: string | null = null;

  onCountryChange(value: string) {
    this.selectedCountry = value;
    console.log('Selected:', value);
  }
}
```

### Signal ile Kullanım

```typescript
import { Component, signal } from '@angular/core';
import { SelectComponent, SelectOption } from '@ui/select';

@Component({
  selector: 'app-settings',
  imports: [SelectComponent],
  template: `
    <ui-select
      [options]="themeOptions"
      [selectedValue]="selectedTheme()"
      (selectionChange)="onThemeChange($event)"
    />

    <p>Current theme: {{ selectedTheme() }}</p>
  `
})
export class SettingsComponent {
  themeOptions: SelectOption[] = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'auto', label: 'Auto' }
  ];

  selectedTheme = signal('light');

  onThemeChange(theme: string) {
    this.selectedTheme.set(theme);
  }
}
```

### Option Selected Event

```typescript
import { Component } from '@angular/core';
import { SelectComponent, SelectOption } from '@ui/select';

@Component({
  selector: 'app-language',
  imports: [SelectComponent],
  template: `
    <ui-select
      [options]="languages"
      [selectedValue]="currentLang"
      (optionSelected)="onLanguageSelected($event)"
    />
  `
})
export class LanguageComponent {
  languages: SelectOption[] = [
    { value: 'en', label: 'English' },
    { value: 'tr', label: 'Türkçe' },
    { value: 'de', label: 'Deutsch' }
  ];

  currentLang = 'en';

  // Hem value hem label'a erişim
  onLanguageSelected(option: SelectOption) {
    console.log('Value:', option.value);
    console.log('Label:', option.label);
    this.currentLang = option.value;
  }
}
```

### Readonly Options

```typescript
@Component({
  template: ` <ui-select [options]="readonlyOptions" [selectedValue]="selected" /> `
})
export class ReadonlyComponent {
  // Const array olarak tanımla
  readonly readonlyOptions: ReadonlyArray<SelectOption> = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ] as const;

  selected: string | null = null;
}
```

## 🎯 Özellikler

- ✅ **Signal-based** - Reaktif menu state yönetimi
- ✅ **Keyboard Navigation** - Escape ile menü kapatma
- ✅ **Click Outside** - Dışarı tıklayınca otomatik kapanır
- ✅ **Accessibility** - ARIA attributes ve semantic HTML
- ✅ **Type-safe** - TypeScript ile tam tip güvenliği
- ✅ **Customizable** - Placeholder ve seçenekler özelleştirilebilir
- ✅ **Events** - `selectionChange` ve `optionSelected` event'leri

## 📁 Dosya Yapısı

```
select/
├── select.component.ts    # Ana component
├── select.html           # Template
├── select.types.ts       # Type tanımları
└── index.ts             # Public API
```

## 🔧 API

### Inputs

| Input           | Type                          | Default              | Açıklama          |
| --------------- | ----------------------------- | -------------------- | ----------------- |
| `options`       | `ReadonlyArray<SelectOption>` | `[]`                 | Seçenek listesi   |
| `selectedValue` | `string \| null`              | `null`               | Seçili değer      |
| `placeholder`   | `string`                      | `'Select an option'` | Placeholder metni |

### Outputs

| Output            | Type                         | Açıklama                                      |
| ----------------- | ---------------------------- | --------------------------------------------- |
| `selectionChange` | `EventEmitter<string>`       | Seçim değiştiğinde emit edilir (sadece value) |
| `optionSelected`  | `EventEmitter<SelectOption>` | Seçim değiştiğinde emit edilir (tüm option)   |

### Types

```typescript
interface SelectOption {
  value: string;
  label: string;
}
```

## 🎨 Customization

Select renkleri CSS değişkenleri ile kontrol edilir:

```css
--foreground
--background
--border
--input
--ring
--accent
--accent-foreground
```

Bu değişkenler `global.css` dosyasında tanımlanmıştır.

## ♿ Accessibility

- `aria-expanded` - Menü durumunu gösterir
- `aria-haspopup="listbox"` - Dropdown olduğunu belirtir
- `role="listbox"` - Liste semantiği
- `role="option"` - Seçenek semantiği
- `Escape` tuşu ile menü kapatma
- Click outside ile menü kapatma

## 💡 İpuçları

### Null başlangıç değeri

```typescript
selectedValue: string | null = null;  // İlk başta hiçbir şey seçili değil
```

### Computed placeholder

```typescript
placeholder = computed(() => (this.loading() ? 'Loading...' : 'Select an option'));
```

### Dynamic options

```typescript
options = signal<SelectOption[]>([]);

async ngOnInit() {
  const data = await this.api.getOptions();
  this.options.set(data);
}
```
