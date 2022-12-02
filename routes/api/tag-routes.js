import express from "express";
const router = express.Router();
import { Tag, Product, ProductTag } from "../../models";

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
	// find all tags
	try {
		const tags = await Tag.findAll({ include: Product });
		if (tags.length === 0) {
			res.status(404).send(`<h1>404 Data Not Found!</h1>
	<h3>No Tags Available</h3>`);
			return;
		}
		res.status(200).json(tags).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/:id", async (req, res) => {
	// find a single tag by its `id`
	const ids = (await Tag.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);
	if (!ids.includes(Number(req.params.id))) {
		res.status(400).send(`<h1>400 Bad Request!</h1>
	<h3>Specified id does not exist.</h3>`);
		return;
	}

	try {
		const tag = await Tag.findByPk(req.params.id, { include: Product });
		res.status(200).json(tag).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.post("/", async (req, res) => {
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
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.post("/:id", async (req, res) => {
	// create a new tag with a specified id
	/**
	 * Request body, req.body, JSON format:
	 * 	{
	 * 		tag_name: "Tag"
	 * 	}
	 */
	try {
		const newTag = await Tag.create({
			id: req.params.id,
			tag_name: req.body.tag_name,
		});
		res.status(201).json(newTag).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.put("/:id", async (req, res) => {
	// update a tag's name by its `id` value
	/**
	 * id needs to be added to body below.
	 * Request body, req.body, JSON format:
	 * 	{
	 * 		tag_name: "Tag"
	 * 	}
	 */
	const idData = await Tag.findAll({
		attributes: ["id"],
	});
	const ids = idData.map((id) => {
		const { id: plainId } = id.get({ plain: true });
		return Number(plainId);
	});
	console.log(ids);
	console.log(req.params.id);
	if (ids.includes(Number(req.params.id))) {
		try {
			const updatedTag = await Tag.update(
				{ tag_name: req.body.tag_name },
				{ where: { id: req.params.id } }
			);
			// sequelize sends an array of length one with 1 if the entry was updated. Otherwise, it sends a 0 if the entry was not.
			if (updatedTag[0]) {
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
			const newTag = await Tag.create({
				id: req.params.id,
				tag_name: req.body.tag_name,
			});
			res.status(201).json(newTag).send();
		} catch (err) {
			console.error(err);
			res.status(500).send(`<h1>500 Internal Server Error</h1>`);
		}
	}
});

router.delete("/:id", async (req, res) => {
	// delete on tag by its `id` value
	try {
		const exists = await Tag.findOne({ where: { id: req.params.id } });
		if (exists) {
			await Tag.destroy({ where: { id: req.params.id } });
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
