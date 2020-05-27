const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    src:String,
    des:String,
    number:Number
});

module.exports = mongoose.model('User',userSchema);