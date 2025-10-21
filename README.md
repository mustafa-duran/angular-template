# Angular Template

Kendimi geliştirmek için hazırladığım, açık kaynak bir Angular çalışma alanı. Kurumsal bir ürün olma iddiası bulunmamaktadır; yeni Angular 20 özelliklerini, Tailwind CSS 4 ile UI denemelerini ve modüler mimari fikirlerini pratik etmek için kullandığım bir projedir. Yine de kodu almak, değiştirmek ve istediğiniz gibi uyarlamak tamamen serbesttir.

## Mevcut durum

- `apps/web` altındaki uygulama şu an yalnızca `router-outlet` kullanan boş bir kabuktur; rotalar projeye göre oluşacaktır.
- `app.config.ts` dosyasında `provideZonelessChangeDetection` ve `provideBrowserGlobalErrorListeners` etkindir; zoneless çalışma ve genel hata yakalama denemeleri için hazırdır.
- `public/styles/global.css`, Tailwind CSS 4 tabanlı temalar, açık/koyu mod değişkenleri ve yardımcı (utility) sınıflar içerir.
- `package.json`, derleme (`npm run build`), biçimlendirme (`npm run format`) ve temizlik (`npm run clean`) komutlarını sağlar.

## Klasör yapısı

- `apps/web`: Angular uygulaması ve kaynak dosyalar
- `public`: Ortak varlıklar, genel stiller ve fontlar
- Kök dosyalar: `angular.json`, `tsconfig.json`, Prettier/PostCSS ayarları
- `node_modules`: Bağımlılıklar (npm install sonrası)

## Çalıştırma

1. `npm install`
2. Geliştirme modu: `npx ng serve`
3. Üretim derlemesi: `npm run build`
4. Biçimlendirme: `npm run format`

> Proje, Angular CLI 20.3 ve Tailwind CSS 4.1 ile test edilmiştir; Node 20+ önerilir.

## Planlanan çalışmalar

- **Uygulamalar (apps) katmanı**: Dashboard, kimlik doğrulama (auth) veya deneme mikro uygulamalar için yeni alt projeler ekleyerek Nx benzeri modülerliği deneyimlemek.
- **Dashboard denemesi**: Dinamik bileşenler (widget’lar), grafikler ve durum kartları içeren; Tailwind grid sistemine yaslanan bir arayüz oluşturmak.
- **UI kütüphanesi**: shadcn/ui’den esinlenen `Button`, `Input`, `Dialog`, `DataTable`, `Toast` gibi Angular bileşenlerini `libs/ui` altında toplamak.
- **Feature kütüphanesi**: Domain bazlı modüller, facade desenleri ve smart/presentational ayrımını `libs/feature` içinde denemek.
- **Core katmanı**: `libs/core` içerisinde kimlik doğrulama (JWT + sosyal giriş), HTTP servisleri, interceptors, guards ve yardımcı (utility) işlevler için tekrar kullanılabilir bloklar oluşturmak.
- **Araçlar (tooling)**: Storybook benzeri bir bileşen kataloğu, uçtan uca (E2E) testler, CI/CD denemeleri ve commit/lint otomasyonlarını eklemek.
- **Dokümantasyon**: Proje ilerledikçe ADR notlarını ve bileşen dokümantasyonlarını barındıracak küçük bir statik site kurmak.

## Kullanım ve katkı

- Kod tamamen açıktır; forkladıktan sonra dilediğiniz gibi değiştirebilirsiniz.
- Pull request göndermeden önce biçimlendirme ve derleme komutlarını çalıştırmanız ve eklediğiniz özellik ya da denemeyi kısaca açıklamanız yeterlidir.
- UI tarafında genel değişkenleri ve Tailwind yardımcı sınıflarını kullanmaya özen göstermeniz, kod tabanının doğal akışına uyum sağlar.

---

Bu depo, öğrendiklerimi kayıt altına aldığım bir oyun alanıdır. Planlanan adımlar ilerledikçe README’yi güncelleyerek neleri başardığımı ve hangi yaklaşımları denediğimi belgelemeye devam edeceğim. Keyifli kullanımlar!
