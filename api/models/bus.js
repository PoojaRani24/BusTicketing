const mongoose = require('mongoose');

const busSchema = mongoose.Schema({
    tickets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Ticket"
        }
    ]
});

module.exports = mongoose.model('Bus',busSchema);