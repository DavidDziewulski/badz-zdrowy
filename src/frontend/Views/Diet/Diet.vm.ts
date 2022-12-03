import { makeAutoObservable } from 'mobx';
import { store } from '../../store';
export class DietVm {
	articles = store.articles.dietArticles;

	constructor() {
		makeAutoObservable(this);
	}
}
