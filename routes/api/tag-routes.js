import express from "express";
const router = express.Router();
import { Tag, Product, ProductTag } from '../../models';

// The `/api/tags` endpoint

router.get('/', (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	console.log(req.body);
});

router.get('/:id', (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
	console.log(req.body);
	console.log(req.params);
});

router.post('/', (req, res) => {
	console.log(req.body);
	// create a new tag
});

router.put('/:id', (req, res) => {
	console.log(req.body);
	console.log(req.params);
	// update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
	console.log(req.body);
	console.log(req.params);
	// delete on tag by its `id` value
});

export default router;