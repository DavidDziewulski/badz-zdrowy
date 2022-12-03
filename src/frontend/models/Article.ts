import { Content } from "./Content";

export enum ArtType {
	diet = 'diet',
	mental = 'mental',
	physic = 'physic',
};

export class Article {
	id?: number;

	title = '';

	icon = '';

	description = '';

	category?: ArtType;

	titleContent = '';

	tableOfContents: string[] = []

	content?: Content[] = [];
}
