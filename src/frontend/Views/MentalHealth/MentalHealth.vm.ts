import { makeAutoObservable } from 'mobx';
import { store } from '../../store';
export class MentalHealthVm {
	articles = store.articles.mentalArticles;

	constructor() {
		makeAutoObservable(this);
	}
}
