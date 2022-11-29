import * as dotenv from "dotenv";
dotenv.config();
import Sequelize from "sequelize";

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASSWORD,
	{
		host: "localhost",
		dialect: "mysql",
		dialectOptions: {
			decimalNumbers: true,
		},
	}
);

export default sequelize;
