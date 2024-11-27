const { Sequelize } = require('sequelize');
const {DATABASE,DB_USERNAME,PASSWORD,HOST,DB_PORT}=process.env



const sequelize = new Sequelize(DATABASE,DB_USERNAME,PASSWORD, {
  host: HOST,
  port:DB_PORT,
  dialect: 'mysql', 
});

const dbConnect = ()=>sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Unable to connect to the database:', error.message));



module.exports = {dbConnect,sequelize}
