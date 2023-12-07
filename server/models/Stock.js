const mongoose = require('mongoose');


const StockSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
});


const StockModel = new mongoose.model('stocks', StockSchema);
module.exports = StockModel