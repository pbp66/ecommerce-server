import express from "express";
const router = express.Router();
import { Product, Category, Tag, ProductTag } from "../../models";

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
	// find all products
	try {
		const products = await Product.findAll({ include: [Category, Tag] });
		if (products.length === 0) {
			res.status(404).send(`<h1>404 Data Not Found!</h1>
	<h3>No Products Available</h3>`);
			return;
		}
		res.status(200).json(products).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

// get one product
router.get("/:id", async (req, res) => {
	// find a single product by its `id`
	const ids = (await Product.findAll({ attributes: ["id"] })).map(
		(element) => element.dataValues.id
	);
	if (!ids.includes(Number(req.params.id))) {
		res.status(400).send(`<h1>400 Bad Request!</h1>
	<h3>Specified id does not exist.</h3>`);
		return;
	}

	try {
		const product = await Product.findByPk(req.params.id, {
			include: [Category, Tag],
		});
		res.status(200).json(product).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

// create new product
router.post("/", (req, res) => {
	/* req.body should look like this...
	  {
		product_name: "Basketball",
		price: 200.00,
		stock: 3,
		tagIds: [1, 2, 3, 4]
	  }
	*/
	Product.create(req.body)
		.then((product) => {
			// if there's product tags, we need to create pairings to bulk create in the ProductTag model
			if (req.body.tagIds.length) {
				const productTagIdArr = req.body.tagIds.map((tag_id) => {
					return { product_id: product.id, tag_id };
				});
				return ProductTag.bulkCreate(productTagIdArr);
			}
			// if no product tags, just respond
			res.status(200).json(product);
		})
		.then((productTagIds) => res.status(200).json(productTagIds))
		.catch((err) => {
			console.error(err);
			res.status(400).json(err);
		});
});

// update product
router.put("/:id", (req, res) => {
	// update product data
	Product.update(req.body, { where: { id: req.params.id } })
		.then((product) => {
			// find all associated tags from ProductTag
			return ProductTag.findAll({ where: { product_id: req.params.id } });
		})
		.then((productTags) => {
			// get list of current tag_ids
			const productTagIds = productTags.map(({ tag_id }) => tag_id);
			// create filtered list of new tag_ids
			const newProductTags = req.body.tagIds
				.filter((tag_id) => !productTagIds.includes(tag_id))
				.map((tag_id) => {
					return { product_id: req.params.id, tag_id };
				});
			// figure out which ones to remove
			const productTagsToRemove = productTags
				.filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
				.map(({ id }) => id);

			// run both actions
			return Promise.all([
				ProductTag.destroy({ where: { id: productTagsToRemove } }),
				ProductTag.bulkCreate(newProductTags),
			]);
		})
		.then((updatedProductTags) => res.json(updatedProductTags))
		.catch((err) => {
			console.error(err);
			res.status(400).json(err);
		});
});

router.delete("/:id", async (req, res) => {
	// delete a product by its `id` value
	try {
		const exists = await Product.findOne({ where: { id } });
		if (exists) {
			await Product.destroy({ where: { id: req.params.id } });
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
