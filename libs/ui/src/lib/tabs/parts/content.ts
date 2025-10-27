import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Tabs } from '../tabs';
import { TABS_CONTENT_CLASSES } from '../tabs.constants';

@Component({
  selector: 'tabs-content',
  template: `
    <section
      role="tabpanel"
      [id]="contentId()"
      [attr.aria-labelledby]="triggerId()"
      [attr.data-state]="dataState()"
      [attr.hidden]="isActive() ? null : ''"
      [attr.aria-hidden]="isActive() ? 'false' : 'true'"
      [class]="classes()"
    >
      <ng-content />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsContent {
  private readonly tabs = inject(Tabs);

  readonly value = input<string>('');
  readonly class = input<string>('');

  readonly classes = computed(() => {
    const custom = this.class().trim();
    return custom ? `${TABS_CONTENT_CLASSES} ${custom}` : TABS_CONTENT_CLASSES;
  });

  readonly dataState = computed(() => (this.tabs.isActive(this.value()) ? 'active' : 'inactive'));
  readonly isActive = computed(() => this.dataState() === 'active');
  readonly triggerId = computed(() => this.tabs.getTriggerId(this.value()));
  readonly contentId = computed(() => this.tabs.getContentId(this.value()));

  constructor() {
    queueMicrotask(() => {
      if (!this.value()) {
        throw new Error('tabs-content requires a matching "value" input.');
      }
    });
  }
}
