const { DataTypes } = require('sequelize');
const {sequelize} = require("../utils/db"); 

const School = sequelize.define('School', {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  name:{
    type: DataTypes.STRING(30),
    allowNull: false,
    unique:true
  },
  address:{
    type : DataTypes.STRING(50),
    allowNull: false
  },
  latitude: {
    type: DataTypes.FLOAT(10, 6), 
    allowNull: false,
  },
  longitude: {
    type: DataTypes.FLOAT(10, 6), 
    allowNull: false,
  }, 
},{
    timestamps: true, 
  }

);

module.exports = School
