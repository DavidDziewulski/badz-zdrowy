import { createServices } from '../Api/ApiService';
import { Articles } from './articles';
import { Diets } from './diets';
import { User } from './user';

export const store = createServices({
	user: () => new User(),
	diets: () => new Diets(),
	articles: () => new Articles(),
});
