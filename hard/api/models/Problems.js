const { Sequelize,sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) =>{
    const Problems = sequelize.define("Problems",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false,
        },
        title:{
            type:DataTypes.STRING,
            unique:true,
            allowNull:false,
            unique:true,
        },
        difficulty:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        link:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    })
    return Problems
}