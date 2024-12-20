import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer.component';
import { RouterOutlet } from '@angular/router';
// import { seedData } from './shared/data/seed';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  template: `
    <app-header />
    <div class="flex-auto flex flex-col">
      <router-outlet />
    </div>
    <app-footer />
  `,
  styles: `
    :host {
      min-height: 100vh;
      display:flex;
      flex-direction:column;
    }
 `,
})
export class AppComponent {
  constructor() {
    // seedData();
  }
}
