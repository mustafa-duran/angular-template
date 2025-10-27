import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dialog-title',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'text-lg font-semibold leading-none tracking-tight'
  }
})
export class DialogTitle {}
