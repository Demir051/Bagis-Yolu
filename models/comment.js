const {DataTypes} = require('sequelize');
const sequelize = require('../data/db');

const Comment = sequelize.define('Comment', {
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

sequelize.sync().then(() => {
    console.log('Comment modeli veritabanında senkronize edildi.');
});

module.exports = Comment;