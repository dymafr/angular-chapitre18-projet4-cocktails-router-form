import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `<ul class="flex flex-col">
    <a class="my-2" routerLink="cocktails" routerLinkActive="active-link"
      >Cocktails</a
    >
    <a class="my-2" routerLink="users" routerLinkActive="active-link">Users</a>
  </ul>`,
  host: { class: 'card flex flex-col p-12' },
  styles: `:host { 
    width: 200px; 
    @media screen and (max-width: 820px) {
      width: 100%; 
    } 
  }`,
})
export class AdminNavbarComponent {}
