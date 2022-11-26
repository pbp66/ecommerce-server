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

router.post('/', async (req, res) => {
	// create a new tag
	/**
	 * Request body, req.body, JSON format:
	 * 	{
	 * 		tag_name: "Tag"
	 * 	}
	 */
	 try {
		const newTag = await Tag.create(req.body);
		res.status(201).json(newTag).send();
	} catch(err) {
		console.log(err);
		res.status(500).send('500 Internal Server Error');
	}
});

router.post('/:id', async (req, res) => {
	// create a new tag with a specified id
	/**
	 * Request body, req.body, JSON format:
	 * 	{
	 * 		tag_name: "Tag"
	 * 	}
	 */
	 try {
		const newTag = await Tag.create(
			{
				id: req.params.id,
				tag_name: req.body.tag_name
			}
		);
		res.status(201).json(newTag).send();
	} catch(err) {
		console.log(err);
		res.status(500).send('500 Internal Server Error');
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	/**
	 * id needs to be added to body below.
	 * Request body, req.body, JSON format:
	 * 	{
	 * 		tag_name: "Tag"
	 * 	}
	 */
	 const ids = await Tag.findAll(
		{
			attributes: ['id']
		}
	);
	if (ids.includes(req.params.id)) {
		try {
			const updatedTag = await Tag.update(
				{
					tag_name: req.body.tag_name
				},
				{ 
					where: {
						id: req.params.id
					}
				}
			);
			// sequelize sends an array of length one with 1 if the entry was updated. Otherwise, it sends a 0 if the entry was not.
			if (updatedTag[0]) {
				res.status(204).send();
			} else {
				res.status(304).send();
			}

		} catch(err) {
			console.log(err);
			res.status(500).send('500 Internal Server Error');
		}
	} else {
		try {
			const newTag = await Tag.create(
				{
					id: req.params.id,
					tag_name: req.body.tag_name
				}
			);
			res.status(201).json(newTag).send();
		} catch(err) {
			console.log(err);
			res.status(500).send('500 Internal Server Error');
		}
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		await Tag.destroy(
			{ 
				where: { 
					id: req.params.id 
				} 
			}
		);
		res.status(204).send();
	} catch(err) {
		console.log(err);
		res.status(500).send('500 Internal Server Error');
	}
});

export default router;