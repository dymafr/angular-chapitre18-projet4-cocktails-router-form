import { Component, computed, inject, signal } from '@angular/core';
import { CocktailsListComponent } from './components/cocktails-list.component';
import { CocktailDetailsComponent } from './components/cocktail-details.component';
import { CocktailsService } from 'app/shared/services/cocktails.service';
import { CartService } from 'app/shared/services/cart.service';

@Component({
  selector: 'app-cocktails',
  imports: [CocktailsListComponent, CocktailDetailsComponent],
  template: `
    <app-cocktails-list
      [(selectedCocktailId)]="selectedCocktailId"
      [likedCocktailIds]="likedCocktailIds()"
      (likecocktail)="likeCocktail($event)"
      (unlikecocktail)="unlikeCocktail($event)"
      [cocktails]="cocktails()"
      class="w-half xs-w-full card"
    />
    @let sc = selectedCocktail(); @if (sc) {
    <app-cocktail-details
      (likecocktail)="likeCocktail($event)"
      (unlikecocktail)="unlikeCocktail($event)"
      (addIngredients)="addIngredients($event)"
      [cocktail]="sc"
      [isLiked]="selectedCocktailLiked()"
      class="w-half xs-w-full card"
    />
    }
  `,
  styles: `
    :host {
      flex: 1 1 auto;
      display: flex;
      gap:24px;
      padding: 24px;
      @media screen and (max-width: 820px) {
        flex-direction: column;
      }
    }
  `,
})
export class CocktailsComponent {
  private cocktailsService = inject(CocktailsService);
  private cartService = inject(CartService);

  cocktails = computed(
    () => this.cocktailsService.cocktailsResource.value() || []
  );

  selectedCocktailId = signal<string | null>(null);
  selectedCocktail = computed(() =>
    this.cocktails().find(({ _id }) => _id === this.selectedCocktailId())
  );
  selectedCocktailLiked = computed(() => {
    const selectedCocktailId = this.selectedCocktailId();
    return selectedCocktailId
      ? this.likedCocktailIds().includes(selectedCocktailId)
      : false;
  });

  likedCocktailIds = computed(() => this.cartService.likedCocktailIds());
  likeCocktail(cocktailId: string) {
    this.cartService.likeCocktail(cocktailId);
  }
  unlikeCocktail(cocktailId: string) {
    this.cartService.unlikeCocktail(cocktailId);
  }
  addIngredients(ingredients: string[]) {
    this.cartService.addIngredients(ingredients);
  }
}
