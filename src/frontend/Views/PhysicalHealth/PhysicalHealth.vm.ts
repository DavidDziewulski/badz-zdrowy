import { makeAutoObservable } from 'mobx';
import { store } from '../../store';
export class PhysicalHealthVm {
	articles = store.articles.physicArticles;

	constructor() {
		makeAutoObservable(this);
	}
}
