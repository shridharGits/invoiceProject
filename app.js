require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const invoiceRoutes = require('./routes/invoice')

mongoose.connect(process.env.DATABASE, {
}).then(()=>{
    console.log('DB CONNECTED');
}).catch((e)=>{
    console.log('DB NOT CONNECTED');
})


// Apis
app.use('/api', invoiceRoutes)


app.listen(port, (req, res)=>{
    console.log(`Sever is running on port ${port}`);
})