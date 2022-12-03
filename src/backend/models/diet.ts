import { DataTypes, Model } from 'sequelize';
import { db } from '../../../database.config';

type DietModel = {
	id: string;
	kcal: number;
	name: string;
	data: string;
};

export class Diet extends Model<DietModel> { };

Diet.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		kcal: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		data: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{
		sequelize: db,
		tableName: 'diets',
	},
);
