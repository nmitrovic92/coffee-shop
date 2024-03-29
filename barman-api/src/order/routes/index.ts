import express from 'express';
import orderController from 'order/controllers/index';

const router = express.Router();

router.post('/login', null, orderController.processOrder);

export default router;
