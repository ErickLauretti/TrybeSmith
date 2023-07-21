import { Router } from 'express';
import productController from '../controllers/product.controller';
import { validateName } from '../middlewares/name.middlewares';
import { validatePrice } from '../middlewares/price.middewares';

const productRouter = Router();

productRouter.get('/', productController.getProduct);
productRouter.post('/', validateName, validatePrice, productController.makeProduct);

export default productRouter;