const express = require('express');
const router  = express.Router();
const Ticket = require('../models/ticket')
const mongoose = require('mongoose');

//----------Open up all tickets/change status to false---------

router.patch('/',(req,res,next) => {
    // res.status(200).json({
    //     message:"Hello"
    // })
    Ticket.update({ status:'true' },{ $set:{status:'false'}})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message :"Ticket is Updated",
            request:{
                type:'GET',
                url:'http://localhost:3000/open'
            }
        })
    })
    .catch( err => {
        console.log(err)
        res.send(500).json(err)
    })
});

module.exports = router;