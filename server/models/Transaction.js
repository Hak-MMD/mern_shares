const mongoose = require('mongoose');


const TransactSchema = new mongoose.Schema({
    userId:  {type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true},
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});


const TransactModel = new mongoose.model('transaction', TransactSchema);
module.exports = TransactModel