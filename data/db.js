const {
    Sequelize
} = require("sequelize");
const config = require("../config");
require("dotenv").config();

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: "mysql",
    define: {
        timestamps: false,
    },
    storage: "./session.mysql",
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
    }
}


connect();

module.exports = sequelize;
