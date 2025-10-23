import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { SelectComponent, SelectOption } from '@ui/select';

import { I18nService } from './i18n.service';
import { LanguageCode } from './i18n.types';

@Component({
  selector: 'core-i18n-select',
  standalone: true,
  imports: [SelectComponent],
  templateUrl: './i18n.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col gap-2 text-sm text-foreground'
  }
})
export class I18nSelectComponent {
  private readonly i18nService = inject(I18nService);

  readonly selectOptions = computed<SelectOption[]>(() =>
    this.i18nService.availableLanguages().map((option) => ({
      value: option.code,
      label: `${option.label} (${option.code.toUpperCase()})`
    }))
  );

  readonly selectedValue = computed(() => this.i18nService.activeLanguage().code);

  constructor() {
    effect(() => {
      const active = this.i18nService.activeLanguage();
      document.documentElement.lang = active.code;
    });
  }

  async onLanguageSelected(code: string): Promise<void> {
    await this.i18nService.setLanguage(code as LanguageCode);
  }
}
