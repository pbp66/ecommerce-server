import { Router as router } from 'express';
import categoryRoutes from './category-routes';
import productRoutes from './product-routes';
import tagRoutes from './tag-routes';

router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/tags', tagRoutes);

export { router };