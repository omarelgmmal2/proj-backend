require("dotenv").config({ path: `${__dirname}/.env` });
const express = require('express');
const  mongoose = require('mongoose');
const app = express();
// const MONGODB_URI = require('./MongoUri')
const orderRouter = require('./router/orderRouter');
const productRouter = require('./router/productRouter');
const usersRouter = require('./router/userRouter');

app.use(express.json());

app.use('/api/users', usersRouter) 

app.use('/api/orders', orderRouter) 

app.use('/api/products', productRouter) 

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
   app.listen(3000 , ()=>{
      console.log("started on port 3000")
   })
})
.catch(err=>{
   console.log(err)
})
