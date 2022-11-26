import express from "express";
const router = express.Router();
import { Tag, Product, ProductTag } from '../../models';

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	try {
		const tags = await Tag.findAll({ include: Product});
		res.status(200).json(tags).send();
	} catch(err) {
		console.log(err);
		res.status(500).send('500 Internal Server Error');
	}
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	try {
		const tag = await Tag.findByPk(
			req.params.id, 
			{ include: Product }
		);
		res.status(200).json(tag).send();
	} catch(err) {
		console.log(err);
		res.status(500).send('500 Internal Server Error');
	}
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