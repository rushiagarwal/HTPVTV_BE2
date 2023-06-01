"use strict";

const Controller = require("../Controller").DemoController;
const UniversalFunctions = require("../Utils/UniversalFunction");
const Joi = require("joi");
const Config = require("../Config");

module.exports = [
    {
        method: 'Get',
        path: '/demo',
        config: {
            handler: async function (request, h) {
                try {
                    // return UniversalFunctions.sendSuccess(
                    //     null,
                    //     await Controller.PrintHello()
                    // );
                    return{
                        'message': 'Hello Demos working. Okay.'
                    }
                }
                catch (e) {
                    return UniversalFunctions.sendError(e);
                }
            },
            description: "Demo String",
            tags: ["api"],
            plugins: {
                "hapi-swagger": {
                  payloadType: "json",
                  responses: Config.APP_CONSTANTS.swaggerDefaultResponseMessages,
                },
              }
        }
    }
]