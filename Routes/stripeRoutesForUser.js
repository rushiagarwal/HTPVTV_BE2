"use strict";

const Controller = require("../Controller").StripeController;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Joi = require("joi");
const Config = require("../Config");

module.exports = [
    {
        method: 'POST',
        path: '/api/webhook',
        config: {
          handler: async function (req, res) {
            try {
               return UniversalFunctions.sendSuccess(null,await Controller.stripeWebhook(req, res));
            } 
            catch (e) {
              return UniversalFunctions.sendError(e);
            }
          },
          description: "webhook API",
          tags: ["api"],
          validate: {
            // payload: Joi.object({
            //   phoneNumber: Joi.string().required(),
            //   countryCode: Joi.string().required(),
            // }),
            //failAction: UniversalFunctions.failActionFunction,
          },
        //   plugins: {
        //     "hapi-swagger": {
        //       payloadType: "json",
        //       responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages,
        //     },
        //   },
        },
      },
];