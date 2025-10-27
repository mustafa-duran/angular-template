import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dialog-header',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col space-y-1.5 text-center sm:text-left'
  }
})
export class DialogHeader {}
