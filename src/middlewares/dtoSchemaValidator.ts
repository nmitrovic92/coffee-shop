import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateDTO = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next();
    } else {
      res.status(400).json({ error });
    }
  };
};
