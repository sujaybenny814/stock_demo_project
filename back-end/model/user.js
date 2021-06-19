const { sequelize ,DataTypes} = require('../database/database');

exports.user = sequelize.define("User",{
    userName:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"Batman",
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"iambatman"
    },
})



