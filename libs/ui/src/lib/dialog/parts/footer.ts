import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dialog-footer',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'flex flex-row items-center justify-end gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-2'
  }
})
export class DialogFooter {}
