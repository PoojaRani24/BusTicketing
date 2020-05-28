const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    status:Boolean,
    name:{type:String,required:true},
    src:{type:String,required:true},
    des:{type:String,required:true},
});

module.exports = mongoose.model('Ticket',ticketSchema);