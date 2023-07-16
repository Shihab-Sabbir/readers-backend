import express from 'express';
import { ProductController } from './product.controller';
import auth from '../../middlewares/auth';
const productRoutes = express.Router();

productRoutes.post('/', auth(), ProductController.createProduct);
productRoutes.patch('/wish/:id', auth(), ProductController.handleWishList);
productRoutes.patch('/read-list/:id', auth(), ProductController.handleReadList);
productRoutes.patch(
  '/read-status/:id',
  auth(),
  ProductController.handleReadStatus
);
productRoutes.get('/', ProductController.getProducts);
productRoutes.get('/:id', ProductController.getSingleProduct);
productRoutes.patch('/:id', auth(), ProductController.updateProduct);
productRoutes.delete('/:id', auth(), ProductController.deleteProduct);

export default productRoutes;
