import express from "express";
import { Sequelize } from "sequelize";
import sequelize from "../../config/connection";
const router = express.Router();
import { Category, Product } from '../../models';

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// Return all categories with its linked products
	try {
		const categories = await Category.findAll({ include: Product});
		res.status(200).json(categories).send();
	} catch(err) {
		console.log(err);
		res.status(500).send('500 Internal Server Error');
	}
});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const category = await Category.findByPk(
			req.params.id, 
			{ include: Product }
		);
		res.status(200).json(category).send();
	} catch(err) {
		console.log(err);
		res.status(500).send('500 Internal Server Error');
	}
});

router.post('/', (req, res) => {
	// create a new category
	// Category.create()
	console.log(req.body);
});

router.put('/:id', (req, res) => {
	// update a category by its `id` value
	// Category.update()
	console.log(req.body);
});

router.delete('/:id', (req, res) => {
	// delete a category by its `id` value
	//Category.destroy()
	console.log(req.body);
	console.log(req.params.id);
});

export default router;