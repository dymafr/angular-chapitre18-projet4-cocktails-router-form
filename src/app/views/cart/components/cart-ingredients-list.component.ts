import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-cart-ingredients-list',
  imports: [],
  template: `
    <h2 class="mb-20">Liste des ingrédients</h2>
    <ul>
      @for(ingredient of ingredientDisplays(); track $index) {
      <li class="my-2">
        {{ ingredient[0] }} : <strong>{{ ingredient[1] }}</strong>
      </li>
      } @empty {
      <p>Aucun ingrédient n'a été ajouté pour le moment</p>
      }
    </ul>
  `,
  styles: `:host { display: block; }`,
})
export class CartIngredientsListComponent {
  ingredients = input<string[]>([]);
  ingredientDisplays = computed(() =>
    Object.entries(
      this.ingredients().reduce((acc, i) => {
        if (acc[i]) {
          acc[i]++;
        } else {
          acc[i] = 1;
        }
        return acc;
      }, {} as { [s: string]: number })
    )
  );
}
