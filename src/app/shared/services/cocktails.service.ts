import { Injectable, resource } from '@angular/core';
import { Cocktail, CocktailForm } from '../interfaces';

const BASE_URL = 'https://restapi.fr/api/acocktails';

@Injectable({
  providedIn: 'root',
})
export class CocktailsService {
  cocktailsResource = resource({
    loader: async (): Promise<Cocktail[]> => (await fetch(BASE_URL)).json(),
  });

  async deleteCocktail(cocktailId: string) {
    await fetch(`${BASE_URL}/${cocktailId}`, {
      method: 'DELETE',
    });
    this.cocktailsResource.reload();
  }

  async createCocktail(cocktailForm: CocktailForm) {
    const response = await fetch(`${BASE_URL}?delay=3`, {
      method: 'POST',
      body: JSON.stringify(cocktailForm),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      this.cocktailsResource.reload();
    } else {
      throw new Error(body);
    }
  }

  async editCocktail(cocktail: Cocktail) {
    const { _id, ...restCocktail } = cocktail;
    const response = await fetch(`${BASE_URL}/${_id}`, {
      method: 'PATCH',
      body: JSON.stringify(restCocktail),
      headers: {
        'Content-type': 'application/json',
      },
    });
    const body = await response.json();
    if (response.ok) {
      this.cocktailsResource.reload();
    } else {
      throw new Error(body);
    }
  }
}
