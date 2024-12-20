import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  likedCocktailIds = signal<string[]>([]);

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
}
