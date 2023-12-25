// models/user.js
const {DataTypes} = require('sequelize');
const sequelize = require('../data/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
    },
});

sequelize.sync().then(() => {
    console.log('User modeli veritabanında senkronize edildi.');
});

module.exports = User;
