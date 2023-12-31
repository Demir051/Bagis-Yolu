const {DataTypes} = require('sequelize');
const sequelize = require('../data/db');

const Content = sequelize.define('Content', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slugUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

sequelize.sync().then(() => {
    console.log('Content modeli veritabanında senkronize edildi.');
});

module.exports = Content;
