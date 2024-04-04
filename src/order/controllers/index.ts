import OrderService from '@order/services/index';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

const orderService = Container.get(OrderService);

const processOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { body: order } = req;

  try {
    await orderService.createOrder(order);
  } catch (error) {
    return res.status(422).json({ message: 'Waiting queue is full' });
  }

  return res.json({ message: 'Your Coffee is getting ready' });
};

export default {
  processOrder,
};
