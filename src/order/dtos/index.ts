import Joi from 'joi';

enum ETypeOfOrder {
  WEB,
  AT_THE_BAR,
}

export interface OrderDTO {
  coffee: string;
  time: Date;
  type: ETypeOfOrder;
}

export const orderDTOSchema: Joi.ObjectSchema = Joi.object({
  coffee: Joi.string().required(),
  time: Joi.string().required(),
  type: Joi.string().valid(...Object.values(ETypeOfOrder)),
});
