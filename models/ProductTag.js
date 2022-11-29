import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection.js";
import Tag from "./Tag.js";

export default class ProductTag extends Model {}

ProductTag.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		product_id: {
			type: DataTypes.INTEGER,
		},
		tag_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Tag,
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "product_tag",
	}
);
