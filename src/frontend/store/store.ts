import { Diets } from './diets';
import { User } from './user';

class Store {
	user = new User();
	diets = new Diets();
}

export const store = new Store();
