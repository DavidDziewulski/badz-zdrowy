import { DataTypes, Model } from 'sequelize';
import { db } from '../../../database.config';
import bcrypt from 'bcrypt';

type UserModel = {
	id: string;
	email: string;
	name: string;
	password: string;
}

export class User extends Model<UserModel> { }

const hasPassword = async (user: User) => {
	user.dataValues.password = await bcrypt.hash(user.dataValues.password, 8);
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		hooks: {
			beforeSave: hasPassword,
		},
		sequelize: db,
		tableName: 'users',
	},
)