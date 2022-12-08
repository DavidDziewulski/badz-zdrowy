import { makeAutoObservable } from 'mobx';
import { Article } from '../../models';
import { store } from '../../store';
export class ArticleVm {
	article?: Article;

	constructor(private id: string) {
		makeAutoObservable(this);

		this.loadArticle();
	}

	loadArticle = () => {
		const result = store.articles.findArticle(Number(this.id));

		if (!result) {
			return;
		}

		this.article = result;
	}
}
