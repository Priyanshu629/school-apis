require("dotenv").config()
const express=require('express')
const app= express()
const port= process.env.PORT || 5000
const {dbConnect} = require("./utils/db")
const {sequelize}= require("./utils/db")
const schoolRouter= require("./routes/school")

//connection to database
dbConnect()

// creating table
sequelize.sync({ force: false })
  .then(() => {
    console.log('Table created successfully');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });


app.use(express.json())

app.use("/api/v1/schools",schoolRouter)

app.listen(port,()=> console.log(`listening to the port ${port}`))