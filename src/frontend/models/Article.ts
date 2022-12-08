import { Content } from "./Content";

export enum ArtType {
	diet = 'diet',
	mental = 'mental',
	physic = 'physic',
};

export class Article {
	id?: number;

	title = '';

	description = '';

	icon = '';

	category?: ArtType;

	titleContent = '';

	tableOfContents: string[] = []

	content?: Content[] = [];
}
