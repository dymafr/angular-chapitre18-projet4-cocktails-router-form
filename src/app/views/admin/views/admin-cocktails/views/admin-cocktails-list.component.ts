import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CocktailsService } from 'app/shared/services/cocktails.service';

@Component({
  selector: 'app-admin-cocktails-list',
  imports: [RouterLink],
  template: `
    <h3 class="mb-20">Liste des cocktails</h3>
    <ul>
      @for (cocktail of cocktails(); track cocktail._id) {
      <li class="flex gap-12 card align-items-center mb-10">
        <span class="flex-auto">{{ cocktail.name }}</span>
        <button
          [routerLink]="['..', cocktail._id, 'edit']"
          class="btn btn-primary"
        >
          Modifier
        </button>
        <button (click)="deleteCocktail(cocktail._id)" class="btn btn-danger">
          Supprimer
        </button>
      </li>
      } @empty {
      <p>Il n'y a pas de cocktail pour l'instant</p>
      }
    </ul>
  `,
  host: { class: 'card' },
  styles: ` .card { padding: 8px; }`,
})
export class AdminCocktailsListComponent {
  cocktailsService = inject(CocktailsService);
  cocktails = computed(
    () => this.cocktailsService.cocktailsResource.value() || []
  );
  deleteCocktail(cocktailId: string) {
    this.cocktailsService.deleteCocktail(cocktailId);
  }
}
