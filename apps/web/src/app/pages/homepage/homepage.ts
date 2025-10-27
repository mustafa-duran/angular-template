import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import type { ButtonSize, ButtonVariant } from '@ui/button';
import { Button } from '@ui/button';
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@ui/dialog';
import type { DropdownMenuItem, DropdownMenuSection } from '@ui/dropdown-menu';
import { DropdownMenu } from '@ui/dropdown-menu';
import type { SelectOption } from '@ui/select';
import { Select } from '@ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Toast, ToastService } from '@ui/toast';

interface TabExample {
  value: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-homepage',
  imports: [
    CommonModule,
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DropdownMenu,
    Select,
    Toast,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
  ],
  templateUrl: './homepage.html'
})
export class Homepage {
  private readonly toast = inject(ToastService);

  readonly buttonVariants: ReadonlyArray<{ label: string; variant: ButtonVariant }> = [
    { label: 'Default', variant: 'default' },
    { label: 'Secondary', variant: 'secondary' },
    { label: 'Outline', variant: 'outline' },
    { label: 'Ghost', variant: 'ghost' },
    { label: 'Link', variant: 'link' },
    { label: 'Destructive', variant: 'destructive' }
  ];

  readonly buttonSizes: ReadonlyArray<{ label: string; size: ButtonSize; variant: ButtonVariant }> =
    [
      { label: 'Small', size: 'sm', variant: 'default' },
      { label: 'Default', size: 'default', variant: 'default' },
      { label: 'Large', size: 'lg', variant: 'default' },
      { label: 'Icon', size: 'icon', variant: 'secondary' }
    ];

  readonly frameworkOptions: ReadonlyArray<SelectOption> = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' }
  ];

  readonly selectedFramework = signal(this.frameworkOptions[0].value);

  readonly frameworkLabel = computed(() => {
    const current = this.frameworkOptions.find(
      (option) => option.value === this.selectedFramework()
    );
    return current?.label ?? 'Unknown';
  });

  readonly dropdownSections: ReadonlyArray<DropdownMenuSection> = [
    {
      id: 'workspace',
      label: 'Workspace',
      items: [
        {
          value: 'create-draft',
          label: 'Create draft',
          description: 'Start a new initiative from scratch'
        },
        {
          value: 'import-docs',
          label: 'Import docs',
          description: 'Bring content in from another workspace'
        }
      ]
    },
    {
      id: 'operations',
      label: 'Operations',
      items: [
        {
          value: 'share-update',
          label: 'Share status update',
          description: 'Post a weekly note to the team wall'
        },
        {
          value: 'pause-reports',
          label: 'Pause automated reports',
          destructive: true,
          description: 'Temporarily stop sending scheduled emails'
        }
      ]
    }
  ];

  readonly lastMenuItem = signal<DropdownMenuItem | null>(null);

  readonly tabsExamples: ReadonlyArray<TabExample> = [
    {
      value: 'overview',
      label: 'Overview',
      description: 'High-level progress, goals, and health indicators for stakeholders.'
    },
    {
      value: 'activity',
      label: 'Activity',
      description: 'Chronological log of significant events and cross-functional updates.'
    },
    {
      value: 'notes',
      label: 'Notes',
      description: 'Scratchpad for meeting highlights, action items, and decision context.'
    }
  ];

  readonly activeTab = signal(this.tabsExamples[0].value);

  readonly reminderAudienceOptions: ReadonlyArray<SelectOption> = [
    { value: 'product', label: 'Product team' },
    { value: 'marketing', label: 'Marketing team' },
    { value: 'ops', label: 'Operations group' }
  ];

  readonly reminderAudience = signal(this.reminderAudienceOptions[0].value);
  readonly reminderNote = signal('');
  readonly dialogOpen = signal(false);

  onFrameworkChange(value: string): void {
    this.selectedFramework.set(value);
    const label = this.frameworkOptions.find((option) => option.value === value)?.label ?? value;
    this.toast.toast('Framework selected', {
      description: `${label} will be used for the next integration example.`
    });
  }

  onMenuSelect(item: DropdownMenuItem): void {
    this.lastMenuItem.set(item);
    this.toast.toast(item.label, {
      description: item.description ?? 'Action added to the automation queue.'
    });
  }

  changeTab(value: string | null): void {
    if (!value) {
      return;
    }
    this.activeTab.set(value);
  }

  openDialog(): void {
    this.setDialogOpen(true);
  }

  closeDialog(): void {
    this.setDialogOpen(false);
  }

  handleDialogOpenChange(open: boolean): void {
    this.setDialogOpen(open);
  }

  updateReminderNote(value: string): void {
    this.reminderNote.set(value);
  }

  updateReminderAudience(value: string): void {
    this.reminderAudience.set(value);
  }

  submitReminder(): void {
    const note = this.reminderNote().trim();
    if (!note) {
      this.toast.toast('Add a reminder note', {
        description: 'Write what should happen when the reminder fires.'
      });
      return;
    }

    const audienceLabel =
      this.reminderAudienceOptions.find((option) => option.value === this.reminderAudience())
        ?.label ?? 'team';

    this.toast.toast('Reminder scheduled', {
      description: `We will notify the ${audienceLabel.toLowerCase()} tomorrow morning.`
    });

    this.setDialogOpen(false);
  }

  showToast(): void {
    this.toast.toast('Workspace synced', {
      description: 'We pulled the latest data and refreshed visible dashboards.',
      action: {
        label: 'View logs',
        onClick: () => {
          this.toast.toast('Opening logs', {
            description: 'System logs open in a new tab.'
          });
        }
      }
    });
  }

  private setDialogOpen(open: boolean): void {
    this.dialogOpen.set(open);

    if (!open) {
      const defaultAudience = this.reminderAudienceOptions[0]?.value ?? 'product';
      this.reminderNote.set('');
      this.reminderAudience.set(defaultAudience);
    }
  }
}
