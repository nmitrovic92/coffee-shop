import Joi from 'joi';

enum ETypeOfOrder {
  WEB,
  AT_THE_BAR,
}

export interface OrderDTO {
  coffee: string;
  timeOfOrder: Date;
  typeOfOrder: ETypeOfOrder;
}

export const orderDTOSchema: Joi.ObjectSchema = Joi.object({
  coffee: Joi.string().required(),
  timeOfOrder: Joi.string().required(),
  typeOfOrder: Joi.string().valid(...Object.values(ETypeOfOrder)),
});
