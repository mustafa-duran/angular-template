# @core/i18n

Angular çoklu dil desteği (internationalization) modülü. Signal-based reaktif bir yapı ile çalışır.

## 📦 İçerik

- **I18nService** - Dil yönetimi ve çeviri servisi
- **I18nSelectComponent** - Dil seçici UI komponenti
- **TranslatePipe** - Template'lerde kullanılacak çeviri pipe'ı
- **i18nInterceptor** - HTTP isteklerinde dil parametresi ekleyen interceptor

## 🚀 Kurulum

### 1. Konfigürasyon

`app.config.ts` dosyasında provider'ları ekleyin:

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { i18nInterceptor, LANGUAGE_OPTIONS, provideI18nConfig } from '@core/i18n';
import { selectLanguages } from '@core/utils';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([i18nInterceptor])),
    provideI18nConfig({
      languages: selectLanguages(LANGUAGE_OPTIONS, 'en', 'tr'), // Sadece istediğiniz dilleri seçin
      defaultLanguage: 'en',
      projectName: 'web'
    })
  ]
};
```

### 2. Çeviri Dosyaları

`/public/i18n/{projectName}/{languageCode}.json` formatında JSON dosyaları oluşturun:

```
public/
  i18n/
    web/
      en.json
      tr.json
      es.json
```

**Örnek `en.json`:**

```json
{
  "welcome": "Welcome",
  "hello": "Hello {{name}}",
  "nested": {
    "key": "Nested value"
  }
}
```

## 💡 Kullanım

### Component'te Dil Değiştirme

```typescript
import { I18nService } from '@core/i18n';

export class MyComponent {
  private i18nService = inject(I18nService);

  async changeLanguage() {
    await this.i18nService.setLanguage('tr');
  }

  getCurrentLanguage() {
    return this.i18nService.activeLanguage().code; // 'en'
  }
}
```

### Template'te Çeviri

```typescript
// Component
import { TranslatePipe } from '@core/i18n';

@Component({
  imports: [TranslatePipe]
})
```

```html
<!-- Template -->
<h1>{{ 'welcome' | translate }}</h1>
<p>{{ 'hello' | translate }}</p>
<span>{{ 'nested.key' | translate }}</span>
```

### Dil Seçici Komponenti

```typescript
import { I18nSelectComponent } from '@core/i18n';

@Component({
  imports: [I18nSelectComponent]
})
```

```html
<core-i18n-select />
```

### Service Metodları

```typescript
// Çeviri al
i18nService.translate('welcome'); // 'Welcome'

// Parametreli çeviri
i18nService.translate('hello', { name: 'John' }); // 'Hello John'

// Aktif dil (signal)
i18nService.activeLanguage(); // { code: 'en', label: 'English' }

// Dil değiştir
await i18nService.setLanguage('tr');

// Proje adını değiştir
i18nService.setProjectName('admin');
```

## 🎯 Özellikler

- ✅ **Signal-based** - Reaktif ve performanslı
- ✅ **LocalStorage** - Seçilen dil otomatik kaydedilir
- ✅ **Lazy Loading** - Çeviri dosyaları ihtiyaç anında yüklenir
- ✅ **Nested Keys** - `'user.profile.name'` şeklinde iç içe anahtarlar
- ✅ **Interpolation** - `{{variable}}` ile parametre desteği
- ✅ **Cache-busting** - HTTP interceptor ile otomatik versiyon kontrolü
- ✅ **40 Dil** - Hazır dil seçenekleri (constants'ta)

## 📁 Dosya Yapısı

```
i18n/
├── i18n.component.ts      # Dil seçici UI
├── i18n.constants.ts      # Dil listesi ve sabitler
├── i18n.html              # Component template
├── i18n.interceptor.ts    # HTTP interceptor
├── i18n.pipe.ts           # Çeviri pipe
├── i18n.service.ts        # Ana servis
├── i18n.types.ts          # Type tanımları
└── index.ts               # Public API
```

## 🔧 Yapılandırma

```typescript
export interface I18nConfig {
  languages: LanguageOption[]; // Desteklenen diller
  defaultLanguage?: LanguageCode; // Varsayılan dil (default: 'en')
  projectName?: string; // Proje adı (default: 'web')
}
```

**Not:** `selectLanguages` utility fonksiyonu ile 40 hazır dilden sadece ihtiyacınız olanları seçebilirsiniz (yukarıdaki kurulum örneğinde gösterildiği gibi).
