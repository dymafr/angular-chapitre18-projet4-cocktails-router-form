import { Component, computed, inject } from '@angular/core';
import { CartIngredientsList } from './components/cart-ingredients-list';
import { CartDataClient } from 'app/shared/services/cart.data-client';

@Component({
  selector: 'app-cart',
  imports: [CartIngredientsList],
  template: `<app-cart-ingredients-list
    class="card"
    [ingredients]="ingredients()"
  /> `,
  styles: `:host { flex: 1 1 auto; padding: 24px; }`,
})
export class Cart {
  private cartService = inject(CartDataClient);
  ingredients = computed(() => this.cartService.ingredients());
}
