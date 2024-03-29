import { NextFunction } from 'express';

const processOrder = async (req: Request, res: Response, next: NextFunction) => {
  return await res.json();
};

export default {
  processOrder,
};
