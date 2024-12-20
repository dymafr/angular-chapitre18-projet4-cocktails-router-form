import { Component, inject, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CocktailForm } from 'app/shared/interfaces';
import { CocktailsService } from 'app/shared/services/cocktails.service';

@Component({
  selector: 'app-admin-cocktails-form',
  imports: [ReactiveFormsModule],
  template: `
    <h3 class="mb-20">Création d'un cocktail</h3>
    <form [formGroup]="cocktailForm" (submit)="submit()">
      <div class="flex flex-col gap-12 mb-10">
        <label for="name">Nom du cocktail</label>
        <input formControlName="name" id="name" type="text" />
        @if (nameControl.errors?.['required'] && (nameControl.touched ||
        cocktailForm.dirty)) {
        <p class="error">Le nom du cocktail est obligatoire</p>
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <label for="imageUrl">Url de l'image</label>
        <input formControlName="imageUrl" id="imageUrl" type="text" />
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <label for="description">Description du cocktail</label>
        <textarea
          formControlName="description"
          id="description"
          cols="3"
        ></textarea>
      </div>
      <div class="mb-20">
        <div class="flex align-items-center gap-12 mb-10">
          <label class="flex-auto">Ingredients</label>
          <button
            type="button"
            (click)="addIngredient()"
            class="btn btn-primary"
          >
            Ajouter
          </button>
        </div>
        <ul formArrayName="ingredients">
          @for(ingredient of ingredientsControl.controls; track $index) {
          <li class="flex align-items-center gap-12 mb-10">
            <input class="flex-auto" [formControlName]="$index" type="text" />
            <button (click)="deleteIngredient($index)" class="btn btn-danger">
              Supprimer
            </button>
          </li>
          }
        </ul>
      </div>
      <div>
        <button
          [disabled]="cocktailForm.invalid || this.isLoading()"
          class="btn btn-primary"
        >
          Sauvegarder
        </button>
      </div>
    </form>
  `,
  host: { class: 'card' },
  styles: ` .card { padding: 8px; }`,
})
export class AdminCocktailsFormComponent {
  private fb = inject(FormBuilder);
  private cocktailService = inject(CocktailsService);

  isLoading = signal(false);

  cocktailForm = this.fb.group({
    name: ['', Validators.required],
    imageUrl: [''],
    description: [''],
    ingredients: this.fb.array([]),
  });

  get ingredientsControl() {
    return this.cocktailForm.get('ingredients') as FormArray;
  }

  get nameControl() {
    return this.cocktailForm.get('name') as FormControl;
  }

  deleteIngredient(index: number) {
    this.ingredientsControl.removeAt(index);
  }

  addIngredient() {
    this.ingredientsControl.push(this.fb.control(''));
  }

  async submit() {
    this.isLoading.set(true);
    try {
      await this.cocktailService.createCocktail(
        this.cocktailForm.getRawValue() as CocktailForm
      );
    } catch (e) {
    } finally {
      this.isLoading.set(false);
    }
  }
}