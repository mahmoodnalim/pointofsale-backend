import Joi from "@hapi/joi";

export const CREATE_ITEM_STAT_REQUEST_BODY = {
  itemId: Joi.number(),
  supplierId: Joi.number(),
  costPrice: Joi.number(),
  salesPrice: Joi.number(),
  manuDate: Joi.date().optional(),
  expDate: Joi.date().optional(),
  quantity: Joi.number(),
};