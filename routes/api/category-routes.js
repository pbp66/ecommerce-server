import express from "express";
const router = express.Router();
import { Category, Product } from '../../models';

// The `/api/categories` endpoint

router.get('/', (req, res) => {
	// find all categories
	// be sure to include its associated Products
	console.log(req.body);
});

router.get('/:id', (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	console.log(req.body);
	console.log(req.params);
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