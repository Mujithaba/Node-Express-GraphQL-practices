require('dotenv').config();
const express = require('express');
const DBConnection = require('./database/db');
const BookRouter = require('./routes/books-route')

const app = express();
const PORT = process.env.PORT || 3000;

// connection of database
DBConnection();

// middleware using express json
app.use(express.json());

// here routes
app.use('/api/books',BookRouter)

app.listen(PORT,()=>{
    console.log(`Server running on Port ${PORT}`);
});