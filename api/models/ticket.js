const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    status:Boolean,
    name:String,
    src:String,
    des:String,
});

module.exports = mongoose.model('Ticket',ticketSchema);