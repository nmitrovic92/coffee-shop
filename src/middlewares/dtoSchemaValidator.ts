import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateDTO = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;

    try {
      const { error } = schema.validate(body);

      if (!error) {
        next();
      } else {
        res.status(400).json({ error });
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  };
};
