import { DataTypes, Model } from 'sequelize';
import { db } from '../../../database.config';
import bcrypt from 'bcrypt';

type UserModel = {
	id: string;
	email: string;
	name: string;
	password: string;
	isActive: boolean;
	tokenId: string;
}

export class User extends Model<UserModel> { }

const hashPassword = async (user: User) => {
	user.dataValues.password = await bcrypt
		.hash(user.dataValues.password, 8);
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
		isActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
		tokenId: {
			type: DataTypes.UUIDV4,
			unique: true,
			allowNull: true,
		},
	},
	{
		hooks: {
			beforeSave: hashPassword,
		},
		sequelize: db,
		tableName: 'users',
	},
)