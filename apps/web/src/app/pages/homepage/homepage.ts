import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ButtonComponent } from '@ui/button';
import {
  DialogComponent,
  DialogDescriptionComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
  DialogTitleComponent
} from '@ui/dialog';
import { DropdownMenuComponent, DropdownMenuItem, DropdownMenuSection } from '@ui/dropdown-menu';
import { SelectComponent, SelectOption } from '@ui/select';
import {
  TabsComponent,
  TabsContentComponent,
  TabsListComponent,
  TabsTriggerComponent
} from '@ui/tabs';
import { ToastComponent, ToastService } from '@ui/toast';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DialogComponent,
    DialogHeaderComponent,
    DialogFooterComponent,
    DialogTitleComponent,
    DialogDescriptionComponent,
    DropdownMenuComponent,
    SelectComponent,
    ToastComponent,
    TabsComponent,
    TabsListComponent,
    TabsTriggerComponent,
    TabsContentComponent
  ],
  templateUrl: './homepage.html'
})
export class Homepage {
  private readonly toast = inject(ToastService);

  readonly projectOptions: ReadonlyArray<SelectOption> = [
    { value: 'analytics', label: 'Analytics Dashboard' },
    { value: 'billing', label: 'Billing Service' },
    { value: 'mobile', label: 'Mobile App' },
    { value: 'website', label: 'Marketing Website' }
  ];

  readonly quickActions: ReadonlyArray<DropdownMenuSection> = [
    {
      id: 'alerts',
      label: 'Alerts',
      items: [
        {
          value: 'publish-report',
          label: 'Share weekly report',
          description: 'Send a digest to the leadership channel',
          shortcut: '⇧⌘P'
        },
        {
          value: 'restart-services',
          label: 'Restart services',
          description: 'Queue rolling restarts for the cluster',
          shortcut: '⌘R'
        }
      ]
    },
    {
      id: 'team',
      label: 'Team',
      items: [
        {
          value: 'add-seat',
          label: 'Purchase extra seats',
          description: 'Opens billing to add seats',
          shortcut: '⌘B'
        },
        {
          value: 'archive-project',
          label: 'Archive project',
          destructive: true,
          description: 'Hide the project for all members'
        }
      ]
    }
  ];

  readonly roleOptions: ReadonlyArray<SelectOption> = [
    { value: 'member', label: 'Product Member' },
    { value: 'analyst', label: 'Data Analyst' },
    { value: 'designer', label: 'Product Designer' },
    { value: 'developer', label: 'Developer' }
  ];

  readonly selectedProject = signal(this.projectOptions[0].value);
  readonly lastAction = signal<DropdownMenuItem | null>(null);
  readonly inviteDialogOpen = signal(false);
  readonly inviteEmail = signal('');
  readonly inviteRole = signal(this.roleOptions[0].value);
  readonly isSendingInvite = signal(false);
  readonly accountSettingsTab = signal<'account' | 'password'>('account');
  readonly accountName = signal('Pedro Duarte');
  readonly accountUsername = signal('@peduarte');
  readonly currentPassword = signal('');
  readonly newPassword = signal('');
  readonly confirmPassword = signal('');
  readonly isSavingAccount = signal(false);
  readonly isUpdatingPassword = signal(false);
  readonly passwordMismatch = computed(() => {
    const nextPassword = this.newPassword();
    const confirmation = this.confirmPassword();
    return nextPassword.length > 0 && confirmation.length > 0 && nextPassword !== confirmation;
  });

  readonly projectLabel = computed(() => {
    const current = this.projectOptions.find((option) => option.value === this.selectedProject());
    return current?.label ?? 'Unassigned';
  });

  onProjectChange(value: string): void {
    this.selectedProject.set(value);
    const label = this.projectOptions.find((option) => option.value === value)?.label ?? value;
    this.toast.toast('Project switched', {
      description: `${label} is now the focus for daily reports.`
    });
  }

  onQuickAction(item: DropdownMenuItem): void {
    this.lastAction.set(item);
    const description = item.description ?? 'We will keep you posted in the activity feed.';
    this.toast.toast(item.label, { description });
  }

  openInviteDialog(defaultRole: string = this.roleOptions[0].value): void {
    this.inviteRole.set(defaultRole);
    this.inviteDialogOpen.set(true);
  }

  updateEmail(value: string): void {
    this.inviteEmail.set(value);
  }

  updateInviteRole(value: string): void {
    this.inviteRole.set(value);
  }

  cancelInvite(): void {
    this.inviteDialogOpen.set(false);
    this.inviteEmail.set('');
  }

  async sendInvite(): Promise<void> {
    if (this.isSendingInvite()) {
      return;
    }

    this.isSendingInvite.set(true);

    const email = this.inviteEmail();
    const roleLabel = this.roleOptions.find((option) => option.value === this.inviteRole())?.label;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    this.toast.toast('Invitation sent', {
      description: email
        ? `${email} will join as ${roleLabel ?? 'member'}.`
        : `A new ${roleLabel ?? 'member'} invite is on its way.`
    });

    this.isSendingInvite.set(false);
    this.inviteDialogOpen.set(false);
    this.inviteEmail.set('');
  }

  triggerHealthToast(): void {
    this.toast.toast('Daily health check queued', {
      description: 'We will email the status summary in a few minutes.'
    });
  }

  markPreflight(): void {
    this.toast.toast('Preflight checklist approved', {
      description: 'QA signed off on the latest release build.'
    });
  }

  pauseRollout(): void {
    this.toast.toast('Rollout paused', {
      description: 'Traffic is routed back to the previous stable version.'
    });
  }

  resumeRollout(): void {
    this.toast.toast('Rollout resumed', {
      description: 'We will gradually shift customers to the new release.'
    });
  }

  changeAccountTab(value: string | null): void {
    if (value === 'account' || value === 'password') {
      this.accountSettingsTab.set(value);
    }
  }

  updateAccountName(value: string): void {
    this.accountName.set(value);
  }

  updateAccountUsername(value: string): void {
    this.accountUsername.set(value);
  }

  updateCurrentPassword(value: string): void {
    this.currentPassword.set(value);
  }

  updateNewPassword(value: string): void {
    this.newPassword.set(value);
  }

  updateConfirmPassword(value: string): void {
    this.confirmPassword.set(value);
  }

  async saveAccountDetails(): Promise<void> {
    if (this.isSavingAccount()) {
      return;
    }

    this.isSavingAccount.set(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    this.toast.toast('Account updated', {
      description: 'Name and username changes were saved successfully.'
    });
    this.isSavingAccount.set(false);
  }

  async updatePassword(): Promise<void> {
    if (this.isUpdatingPassword() || this.passwordMismatch()) {
      return;
    }

    if (!this.currentPassword() || !this.newPassword()) {
      this.toast.toast('Incomplete form', {
        description: 'Fill out the current and new password fields before saving.'
      });
      return;
    }

    this.isUpdatingPassword.set(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    this.toast.toast('Password updated', {
      description: 'Your password is now refreshed across all active sessions.'
    });

    this.currentPassword.set('');
    this.newPassword.set('');
    this.confirmPassword.set('');
    this.isUpdatingPassword.set(false);
    this.accountSettingsTab.set('account');
  }
}
