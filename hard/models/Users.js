const { Sequelize,sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define("Users",{
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:true,
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
    })
    return Users
}