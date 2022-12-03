import { createServices } from '../Api/ApiService';
import { Diets } from './diets';
import { User } from './user';

export const store = createServices({
	user: () => new User(),
	diets: () => new Diets(),
});
