# Angular Template

Modern Angular uygulamaları geliştirmek için hazırlanmış, açık kaynak bir başlangıç şablonudur. Angular 20, Tailwind CSS 4 ve modüler mimari prensiplerini bir araya getirerek, ölçeklenebilir ve bakımı kolay projeler oluşturmanıza yardımcı olur.

## ✨ Özellikler

- **Angular 20** - Zoneless change detection ve modern özellikler
- **Tailwind CSS 4** - Utility-first CSS framework ve tema desteği
- **Modüler yapı** - Monorepo yaklaşımı ile organize edilmiş kütüphaneler
- **TypeScript** - Tip güvenli geliştirme deneyimi
- **Path mappings** - Temiz ve okunabilir import'lar (`@core/*`, `@ui/*`)

## 📦 Proje yapısı

```
angular-template/
├── apps/
│   └── web/                 # Ana Angular uygulaması
├── libs/
│   ├── core/               # Temel servisler ve utilities
│   │   ├── i18n/          # Çoklu dil desteği
│   │   └── utils/         # Yardımcı fonksiyonlar
│   └── ui/                # UI bileşenleri
│       ├── button/        # Button komponenti
│       └── select/        # Select komponenti
└── public/
    ├── i18n/              # Çeviri dosyaları
    └── styles/            # Global stiller ve temalar
```

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npx ng serve

# Üretim derlemesi
npm run build

# Kodu biçimlendir
npm run format
```
