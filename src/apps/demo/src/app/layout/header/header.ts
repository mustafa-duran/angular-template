import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '@features';
import { NavigationMenuChild, NavigationMenuItem, UiNavigationMenuComponent } from '@ui';

@Component({
  selector: 'app-header',
  imports: [RouterLink, UiNavigationMenuComponent, ThemeToggleComponent],
  templateUrl: './header.html',
})
export class Header {
  navigationMenuItems: NavigationMenuItem[] = [
    {
      label: 'Core',
      children: [
        {
          label: 'Login',
          href: '/auth/login',
          description: 'Login to your account',
        },
        {
          label: 'Register',
          href: '/auth/register',
          description: 'Create a new account',
        },
        {
          label: 'Utilities',
          href: '/utilities',
          description: 'A set of essential Angular utilities',
        },
      ] as NavigationMenuChild[],
    },
    {
      label: 'Features',
      children: [
        {
          label: 'Theme Toggle',
          href: '/theme-toggle',
          description: 'Toggle the application theme between light and dark mode.',
        },
      ] as NavigationMenuChild[],
    },
    {
      label: 'UI',
      children: [
        {
          label: 'Button',
          href: '/button',
          description: 'A button component.',
        },
        { label: 'Textbox', href: '/textbox', description: 'A textbox component.' },
        {
          label: 'Navigation Menu',
          href: '/navigation-menu',
          description: 'A navigation menu component.',
        },
      ] as NavigationMenuChild[],
    },
  ];
}
