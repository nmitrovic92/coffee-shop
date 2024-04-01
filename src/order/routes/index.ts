import { validateDTO } from '@middlewares/dtoSchemaValidator';
import orderController from '@order/controllers/index';
import { orderDTOSchema } from '@order/dtos/index';
import express from 'express';

const router = express.Router();

router.post('/', validateDTO(orderDTOSchema), orderController.processOrder);

export default router;
