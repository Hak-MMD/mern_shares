const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const request = require('request');
const stocks = require('./stock_data/stocks');
const protect = require('./middlewares/auth');
const app = express();
require('dotenv').config();


const userRoutes = require('./routes/userRoutes');
const stockRoutes = require('./routes/stockRoutes');
const StockModel = require('./models/Stock');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use('/user', userRoutes);
app.use('/stock', protect, stockRoutes);


app.post('/stock', async (req, res ) => {
    request('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=60min&outputsize=full&apikey=2B3EXWTXF2BHSBS4', function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
})});



const PORT = process.env.PORT || 5000;
const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => {
            console.log('App is running on port: ', PORT);
        });
    } catch (error) {
        console.log(error);
    }
};


start();
