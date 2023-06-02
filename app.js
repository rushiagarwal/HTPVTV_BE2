
const Hapi = require('@hapi/hapi');
const Config = require('./Config');
const DbConnect = require('./Utils/Database')
require('dotenv').config();
const Routes = require("./Routes");
const UniversalFunctions = require("./Utils/UniversalFunction");
const Plugins = require("./Plugins");
const Joi = require("joi")
const Boom = require("@hapi/boom");
const sequelize = require('./Utils/Database')
const Model = require('./Models')
global.globalVarConfig = {};

let serverObject = {
  port: 8000,
  host:'localhost',
  routes: {
    cors: true,
  }
};

// const server = Hapi.Server({
//   host: 'localhost',
//   port: 3010
// });

const init = async () => {

  const server = Hapi.server({...serverObject});
// console.log(server);
   //globalVarConfig = await UniversalFunctions.getGlobalConfigVar();
  // await server.register(Plugins);

  server.route([
    {
      method: "GET",
      path: "/",
      handler: async function (request, h) {
        try {
          return { working: true };
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
  ]);

  // server.route([
  //   {
  //     method: "GET",
  //     path: "/global",
  //     handler: async function (request, h) {
  //       try {
  //         return globalVarConfig;
  //       } catch (err) {
  //         console.log(err);
  //         return err;
  //       }
  //     },
  //   },
  // ]);

  server.route(Routes);
 
  try 
  {
    await server.start();
    console.log("Server running at:", server.info.uri);
  } 
  catch (err) 
  {
    console.log(err);
  }

};
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();


// const Hapi = require('@hapi/hapi');

// const server = Hapi.Server({
//   host: 'localhost',
//   port: 3010
// });

// server.route({
//   method: 'GET',
//   path: '/',
//   handler: (request, h) => {
//     return 'Hello, world!';
//   }
// });

// const startServer = async () => {
//   try {
//     await server.start();
//     console.log(`Server running at: ${server.info.uri}`);
//   } catch (err) {
//     console.error('Error starting server:', err);
//   }
// };

// startServer();
