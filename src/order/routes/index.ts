import express from 'express';
import { validateDTO } from '../../middlewares/dtoSchemaValidator';
import orderController from '../controllers/index';
import { orderDTOSchema } from '../dtos/index';

const router = express.Router();

router.post('/', validateDTO(orderDTOSchema), orderController.processOrder as any);

export default router;
