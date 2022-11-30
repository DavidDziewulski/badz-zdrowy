import { DataTypes, Model } from 'sequelize';
import { db } from '../../../database.config';

type DietModel = {
	id: string;
	kcl: number;
};

export class Diet extends Model<DietModel> { };

Diet.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		kcl: {
			type: DataTypes.,
		},
	},
	{
		sequelize: db,
		tableName: 'diets',
	},
);
