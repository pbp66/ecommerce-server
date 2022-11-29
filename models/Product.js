import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
import Category from "./Category.js";

// Initialize Product model (table) by extending off Sequelize's Model class
export default class Product extends Model {}

// set up fields and rules for Product model
Product.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
		},
		product_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			validate: {
				isNumeric: true,
				isDecimal: true,
			},
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 10,
			validate: {
				isNumeric: true,
				isInt: true,
				min: 0,
			},
		},
		category_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Category,
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "product",
	}
);
