const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'sujay', {
    host: 'localhost',
    dialect: "mysql"
  });

  (async () => {
    await sequelize.sync();
  })();

     sequelize.authenticate().then((e)=>{
        console.log('Connection has been established successfully.');
     }).catch((err)=>{
        console.error('Unable to connect to the database:', err);
     })

    module.exports ={sequelize:sequelize,DataTypes:DataTypes }