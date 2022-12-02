import express from "express";
import routes from "./routes";
import sequelize from "./config/connection";

const app = express();
const PORT = process.env.PORT || 3001;

const enable = true;
const isProduction = process.env.NODE_ENV === "production";
const enableForce = isProduction && enable;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: enableForce });
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
