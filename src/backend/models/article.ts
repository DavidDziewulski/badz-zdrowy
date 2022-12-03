import { DataTypes, Model } from 'sequelize';
import { db } from '../../../database.config';

export enum ArtType {
	diet = 'diet',
	mental = 'mental',
	physic = 'physic',
};

type ArticleModel = {
	id: string;
	title: string;
	icon: string;
	description: string;
	data: string;
	category: ArtType;
};

export class Article extends Model<ArticleModel> { };

Article.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		icon: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		data: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		category: {
			type: DataTypes.ENUM(ArtType.diet, ArtType.mental, ArtType.physic),
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: 'articles',
	},
);
