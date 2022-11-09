const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("diet", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    },
    { timestamps: false });
};