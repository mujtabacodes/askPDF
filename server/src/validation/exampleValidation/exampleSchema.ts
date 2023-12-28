import Joi from "joi"; //This package is use to validate either required fields are passing or not

export const exampleSchema = {
  getExampleData: Joi.object({
    name: Joi.string().required(),
    id: Joi.number().required(),
  }),
};
