import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartDataClient {
  likedCocktailIds = signal<string[]>([]);
  ingredients = signal<string[]>([]);

  likeCocktail(cocktailId: string) {
    this.likedCocktailIds.update((likedCocktails) => [
      ...likedCocktails,
      cocktailId,
    ]);
  }
  unlikeCocktail(cocktailId: string) {
    this.likedCocktailIds.update((likedCocktails) =>
      likedCocktails.filter((id) => id !== cocktailId)
    );
  }
  addIngredients(ingredients: string[]) {
    this.ingredients.update((i) => [...i, ...ingredients]);
  }
}
