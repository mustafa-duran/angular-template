import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dialog-description',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'text-sm text-muted-foreground'
  }
})
export class DialogDescription {}
