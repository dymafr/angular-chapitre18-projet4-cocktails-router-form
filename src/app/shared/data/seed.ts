import { cocktails } from './cocktails.data';

export async function seedData() {
  await fetch('https://restapi.fr/api/acocktails', {
    method: 'POST',
    body: JSON.stringify(cocktails),
    headers: {
      'Content-type': 'application/json',
    },
  });
}
