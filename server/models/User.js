const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        type: Number,
        default: 1500
    },
    saved: [{type: mongoose.Schema.Types.ObjectId, ref: 'stocks'}],
    portfolio: [{type: mongoose.Schema.Types.ObjectId, ref: 'stocks'}]
},
 {
    timestamps: true,
   
});


const UserModel = new mongoose.model('users', UserSchema);
module.exports = UserModel