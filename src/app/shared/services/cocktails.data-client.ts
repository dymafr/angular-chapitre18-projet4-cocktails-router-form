import { Injectable, resource } from '@angular/core';
import { Cocktail } from '../interfaces';
import { httpResource } from '@angular/common/http';

const BASE_URL = 'https://restapi.fr/api/acocktails';

@Injectable({
  providedIn: 'root',
})
export class CocktailsDataClient {
  // cocktailsResource = resource({
  //   loader: async (): Promise<Cocktail[]> => (await fetch(BASE_URL)).json(),
  // });

  // Refactorisation optionnelle depuis Angular 20 avec httpResource
  cocktailsResource = httpResource<Cocktail[]>(() => BASE_URL);

  async deleteCocktail(cocktailId: string) {
    await fetch(`${BASE_URL}/${cocktailId}`, {
      method: 'DELETE',
    });
    this.cocktailsResource.reload();
  }
}
