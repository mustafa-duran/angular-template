import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-dialog-header',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col space-y-1.5 text-center sm:text-left'
  }
})
export class DialogHeaderComponent {}

@Component({
  selector: 'ui-dialog-footer',
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'
  }
})
export class DialogFooterComponent {}

@Component({
  selector: 'ui-dialog-title',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'text-lg font-semibold leading-none tracking-tight'
  }
})
export class DialogTitleComponent {}

@Component({
  selector: 'ui-dialog-description',
  standalone: true,
  template: '<ng-content />',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'text-sm text-muted-foreground'
  }
})
export class DialogDescriptionComponent {}
