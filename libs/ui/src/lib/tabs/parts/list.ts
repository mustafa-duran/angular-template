import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TABS_LIST_CLASSES } from '../tabs.constants';

@Component({
  selector: 'tabs-list',
  template: `
    <div role="tablist" [class]="classes()">
      <ng-content />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsList {
  readonly class = input<string>('');
  readonly classes = computed(() => {
    const custom = this.class().trim();
    return custom ? `${TABS_LIST_CLASSES} ${custom}` : TABS_LIST_CLASSES;
  });
}
