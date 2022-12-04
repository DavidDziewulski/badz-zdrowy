import { makeAutoObservable, observable } from 'mobx';
import { Article, ArtType, Content } from '../models';
import { extendsObservable } from '../utils';
import { baseUrl } from './../Api/baseUrl';

export class Articles {
	articles: Article[] = []

	constructor() {
		makeAutoObservable(this);

		this.loadArticles();
	}

	get dietArticles() {
		if (this.articles.length === 0) {
			return;
		}

		return this.articles.filter(item => item.category === ArtType.diet);
	}

	get physicArticles() {
		if (this.articles.length === 0) {
			console.log('hej')
			return;
		}
		console.log('yal')
		return this.articles.filter(item => item.category === ArtType.physic);
	}

	loadArticles = async () => {
		await fetch(`${baseUrl}api/articles`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((result) => result.json()).then(result => {
			const arts = result.data;

			const toInternalContent = (data: string) => {
				const result = JSON.parse(data);

				const content = result.data.map((item: any) => {
					const newContent = new Content();

					extendsObservable(newContent, {
						title: item.title,
						description: item.description,
					})

					return newContent;
				})

				return {
					titleContent: result.title,
					tableOfContents: result.tableOfContents,
					content,
				}
			}

			this.articles = arts.map((item: any) => {
				const newArt = new Article();

				const { titleContent, tableOfContents, content } = toInternalContent(item.data);

				extendsObservable(newArt, {
					id: item.id,
					title: item.title,
					icon: item.icon,
					description: item.description,
					category: item.category,
					titleContent,
					tableOfContents,
					content,
				})
				return newArt;
			})
		}).catch(e => console.log(e));
	}
}
