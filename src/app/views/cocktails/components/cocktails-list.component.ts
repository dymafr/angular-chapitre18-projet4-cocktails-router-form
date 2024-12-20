import {
  Component,
  computed,
  ElementRef,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cocktail } from 'app/shared/interfaces';

@Component({
  selector: 'app-cocktails-list',
  imports: [FormsModule],
  template: `
    <h2 class="mb-20">Liste des cocktails</h2>
    <input
      [(ngModel)]="filter"
      #search
      type="text"
      class="mb-20 w-full"
      placeholder="Chercher un cocktail"
    />
    <ul class="mb-20">
      @let likedIds = likedCocktailIds(); @for (cocktail of filteredCocktails();
      track cocktail.name) { @let active = cocktail._id ===
      selectedCocktailId();
      <li
        [class.active-item]="active"
        [class.text-primary]="active"
        (click)="selectedCocktailId.set(cocktail._id)"
        class="px-12 py-6 my-2 radius"
      >
        <h3 class="flex">
          <span class="flex-auto">{{ cocktail.name }}</span>
          @if (likedIds.includes(cocktail._id)) {
          <span> &#10084;</span>
          }
        </h3>
      </li>
      }
    </ul>
    <button class="btn btn-primary">Ajouter un cocktail</button>
  `,
  styles: `li:hover { cursor:pointer; background-color: var(--light); transition: all 0.4s } `,
  host: {
    '(window:keydown)': 'keyboardInteraction($event)',
  },
})
export class CocktailsListComponent {
  search = viewChild<ElementRef<HTMLInputElement>>('search');
  filter = signal('');
  cocktails = input<Cocktail[]>();
  filteredCocktails = computed(() =>
    this.cocktails()?.filter(({ name }) =>
      name.toLowerCase().includes(this.filter().toLowerCase())
    )
  );
  selectedCocktailId = model<string | null>();

  likedCocktailIds = input.required<string[]>();
  likecocktail = output<string>();
  unlikecocktail = output<string>();

  keyboardInteraction({ key }: KeyboardEvent) {
    switch (key) {
      case 'Escape': {
        this.selectedCocktailId.set(null);
        break;
      }
      case 'Enter': {
        const selectedCocktailId = this.selectedCocktailId();
        if (selectedCocktailId) {
          if (this.likedCocktailIds().includes(selectedCocktailId)) {
            this.unlikecocktail.emit(selectedCocktailId);
          } else {
            this.likecocktail.emit(selectedCocktailId);
          }
        }
        break;
      }
      case 'ArrowUp':
      case 'ArrowDown': {
        const selectedCocktailId = this.selectedCocktailId();
        const cocktails = this.cocktails();
        if (cocktails?.length) {
          if (selectedCocktailId) {
            const index = cocktails.findIndex(
              ({ _id }) => _id === selectedCocktailId
            );
            if (key === 'ArrowDown') {
              const nextCocktailIndex =
                index === cocktails.length - 1 ? 0 : index + 1;
              this.selectedCocktailId.set(cocktails[nextCocktailIndex]._id);
            } else {
              const nextCocktailIndex =
                index === 0 ? cocktails.length - 1 : index - 1;
              this.selectedCocktailId.set(cocktails[nextCocktailIndex]._id);
            }
          } else {
            if (key === 'ArrowDown') {
              const { _id } = cocktails[0];
              this.selectedCocktailId.set(_id);
            } else {
              const { _id } = cocktails.at(-1)!;
              this.selectedCocktailId.set(_id);
            }
          }
        }

        break;
      }
      default: {
        this.search()?.nativeElement.focus();
      }
    }
  }
}
