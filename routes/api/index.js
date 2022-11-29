import express from "express";
const router = express.Router();

import categoryRoutes from "./category-routes";
import productRoutes from "./product-routes";
import tagRoutes from "./tag-routes";

router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/tags", tagRoutes);

export default router;
