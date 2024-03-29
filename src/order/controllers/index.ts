import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';
import OrderService from '../services/index';

const orderService = Container.get(OrderService);

const processOrder = async (req: Request, res: Response, next: NextFunction) => {
  orderService.makeCoffee();
  res.json({ message: 'Your Coffee is getting ready' });
};

export default {
  processOrder,
};
