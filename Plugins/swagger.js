
const HapiSwagger = require('hapi-swagger');
const Pack = require('../package');
const Config = require('../Config');

exports.plugin = {
    name: 'swagger-plugin',
    register: async (server, option) => {
        const swaggerOptions = {
            info: {
                title: 'HTPVTVBE APP Documentation',
                version: Pack.version,
            },
        };
        await server.register([
            require('@hapi/inert'),
            require('@hapi/vision')]);
        //if (!(process.env.NODE_ENV == "prod")) {

            await server.register([
                {
                    plugin: HapiSwagger,
                    options: swaggerOptions
                }
            ]);     
       // }
    }
};
