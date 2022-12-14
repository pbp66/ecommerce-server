import express from "express";
import { Sequelize } from "sequelize";
const router = express.Router();
import { Category, Product } from "../../models";

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
	// Return all categories with its linked products
	try {
		const categories = await Category.findAll({
			include: Product,
		});
		if (categories.length === 0) {
			res.status(404).send(`<h1>404 Data Not Found!</h1>
	<h3>No Categories Available</h3>`);
			return;
		}
		res.status(200).json(categories).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/:id", async (req, res) => {
	// find one category by its `id` value
	const ids = (await Category.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);
	if (!ids.includes(Number(req.params.id))) {
		res.status(400).send(`<h1>400 Bad Request!</h1>
	<h3>Specified id does not exist.</h3>`);
		return;
	}

	try {
		const category = await Category.findByPk(req.params.id, {
			include: Product,
		});
		res.status(200).json(category).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.post("/", async (req, res) => {
	// create a new category
	/**
	 * Request body, req.body, JSON format:
	 * 	{
	 * 		category_name: "Category"
	 * 	}
	 */
	try {
		let newCategory = await Category.create(req.body);
		res.status(201).json(newCategory).send();
	} catch (err) {
		if (err instanceof Sequelize.ValidationError) {
			res.status(400).send(`<h1>400 Bad Request!</h1>
			<h3>Specified id does not exist.</h3>`);
		} else {
			res.status(500).send(`<h1>500 Internal Server Error</h1>`);
		}
		console.error(err);
	}
});

router.post("/:id", async (req, res) => {
	// create a new category with a specified id
	/**
	 * Request body, req.body, JSON format:
	 * 	{
	 * 		category_name: "Category"
	 * 	}
	 */
	try {
		const newCategory = await Category.create({
			id: req.params.id,
			category_name: req.body.category_name,
		});
		res.status(201).json(newCategory).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.put("/:id", async (req, res) => {
	// update a category by its `id` value
	/**
	 * id needs to be added to body below.
	 * Request body, req.body, JSON format:
	 * 	{
	 * 		category_name: "Category"
	 * 	}
	 */
	const ids = (await Category.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);

	if (ids.includes(Number(req.params.id))) {
		try {
			const updatedCategory = await Category.update(
				{ category_name: req.body.category_name },
				{ where: { id: req.params.id } }
			);
			// sequelize sends an array of length one with 1 if the entry was updated. Otherwise, it sends a 0 if the entry was not.
			if (updatedCategory[0]) {
				res.status(204).send();
			} else {
				res.status(304).send();
			}
		} catch (err) {
			console.error(err);
			res.status(500).send(`<h1>500 Internal Server Error</h1>`);
		}
	} else {
		try {
			const newCategory = await Category.create({
				id: req.params.id,
				category_name: req.body.category_name,
			});
			res.status(201).json(newCategory).send();
		} catch (err) {
			console.error(err);
			res.status(500).send(`<h1>500 Internal Server Error</h1>`);
		}
	}
});

router.delete("/:id", async (req, res) => {
	// delete a category by its `id` value
	try {
		const exists = await Category.findOne({ where: { id: req.params.id } });
		if (exists) {
			await Category.destroy({ where: { id: req.params.id } });
			res.status(204).send();
		} else {
			res.status(404).send(`<h1>404 Data Not Found!</h1>
	<h3>No Tags Available</h3>`);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

export default router;
