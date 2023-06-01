const Config = require('../../Config')
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    Config.dbConfig.config.dbCatalogName,
    Config.dbConfig.config.dbUserName,
    Config.dbConfig.config.dbUserPassword,
    {
        host: Config.dbConfig.config.dbURI,
        dialect: 'mysql',
        logging: true,
    });

const init = async () => {

    try 
    {
        await sequelize.authenticate();
        if(process.env.SYNC_REQUIRED)
        {
            sequelize.sync({ alter: true })
        }
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}
init()

module.exports = sequelize;