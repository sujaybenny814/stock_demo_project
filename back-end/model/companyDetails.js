const { sequelize ,DataTypes} = require('../database/database');

exports.company = sequelize.define("company",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true,
        is: /^[a-z]+$/i,   
    },
    currentMarketPrice:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    marketCap:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    stockPE:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    dividendYield:{
        type:DataTypes.DOUBLE,
        allowNull:false,
    },
    roce:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    rocePreviousAnnum:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    debToEquity:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    eps:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    reserves:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
    debt:{
        type:DataTypes.DOUBLE,
        allowNull:false
    },
})



