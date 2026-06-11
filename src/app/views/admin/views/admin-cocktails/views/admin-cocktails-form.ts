import { Component, inject, signal } from '@angular/core';
import {
  form,
  required,
  schema,
  FormRoot,
  FormField,
  applyEach,
} from '@angular/forms/signals';
import { Router } from '@angular/router';
import { CocktailForm } from 'app/shared/interfaces';
import { CocktailsService } from 'app/shared/services/cocktails-service';

@Component({
  selector: 'app-admin-cocktails-form',
  host: { class: 'card' },
  styles: `
    .card {
      padding: 8px;
    }
  `,
  template: `
    <h3 class="mb-20">Création d'un cocktail</h3>
    <form [formRoot]="cocktailForm">
      <div class="flex flex-col gap-12 mb-10">
        <label for="name">Nom</label>
        <input type="text" id="name" [formField]="cocktailForm.name" />
        @let name = cocktailForm.name();
        @if (name.touched()) {
          @for (error of name.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <label for="description">Description</label>
        <textarea
          type="text"
          id="description"
          rows="3"
          [formField]="cocktailForm.description"
        ></textarea>
        @let description = cocktailForm.description();
        @if (description.touched()) {
          @for (error of description.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <label for="imageUrl">Url</label>
        <input type="text" id="imageUrl" [formField]="cocktailForm.imageUrl" />
        @let imageUrl = cocktailForm.imageUrl();
        @if (imageUrl.touched()) {
          @for (error of imageUrl.errors(); track error) {
            <p class="error">{{ error.message }}</p>
          }
        }
      </div>
      <div class="flex flex-col gap-12 mb-10">
        <div class="flex align-items-center mb-20">
          <label class="flex-auto">Ingredients</label>
          <button
            class="btn btn-primary"
            type="button"
            (click)="addIngredient()"
          >
            Ajouter
          </button>
        </div>
        <ul class="mb-20 flex flex-col gap-12">
          @for (ingredient of cocktailForm.ingredients; track $index) {
            <li class="flex align-items-center gap-12">
              <input type="text" class="flex-auto" [formField]="ingredient" />
              <button
                class="btn btn-danger"
                type="button"
                (click)="deleteIngredient($index)"
              >
                Supprimer
              </button>
            </li>
            @if (ingredient().touched()) {
              @for (error of ingredient().errors(); track error) {
                <p class="error">{{ error.message }}</p>
              }
            }
          }
        </ul>
      </div>
      <button
        [disabled]="cocktailForm().submitting()"
        [class.disabled]="
          cocktailForm().invalid() || cocktailForm().submitting()
        "
        class="btn btn-primary"
      >
        Sauvegarder
      </button>
    </form>
  `,
  imports: [FormRoot, FormField],
})
export class AdminCocktailsForm {
  private cocktailService = inject(CocktailsService);
  private router = inject(Router);

  cocktailModel = signal<CocktailForm>({
    name: '',
    description: '',
    imageUrl: '',
    ingredients: [],
  });

  cocktailForm = form(
    this.cocktailModel,
    (schemaPath) => {
      required(schemaPath.name, {
        message: 'Le nom du cocktail est obligatoire',
      });
      required(schemaPath.description, {
        message: 'La description du cocktail est obligatoire',
      });
      required(schemaPath.imageUrl, {
        message: "L'url de l'image du cocktail est obligatoire",
      });
      applyEach(schemaPath.ingredients, (schemaPathIngredient) => {
        required(schemaPathIngredient, {
          message: "Le nom de l'ingredient est obligatoire",
        });
      });
    },
    {
      submission: {
        action: async (field) => {
          const cocktailFormValue = field().value();
          await this.cocktailService.createCocktail(cocktailFormValue);
          this.router.navigateByUrl('/admin/cocktails/list');
        },
        onInvalid() {},
      },
    },
  );

  addIngredient() {
    this.cocktailForm
      .ingredients()
      .value.update((ingredients) => [...ingredients, '']);
  }

  deleteIngredient(index: number) {
    this.cocktailForm
      .ingredients()
      .value.update((ingredients) =>
        ingredients.filter((_, Iindex) => Iindex !== index),
      );
  }
}
