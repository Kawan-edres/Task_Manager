const express = require("express");
const app = express();
const connectDb = require("./db/connect");
require("dotenv").config()

const tasks = require("./router/tasks");

const notFound=require("./middleware/notFound")
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.static('./public'))
app.use(express.json()); //with out this we dont have data in req.body

//routes
app.use("/api/v1/tasks", tasks); //root roter for tasks router
app.use(notFound);
app.use(errorHandlerMiddleware);


const port = 3000;
const start = async () => {
  //it return a promise that is why we used async
  try {
    await connectDb(process.env.MONGO_URI); //if the data base connection were success then sart the server
    app.listen(port, console.log(`The server is running on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
