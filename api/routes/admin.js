const express = require('express');
const router  = express.Router();
const Ticket = require('../models/ticket')
const mongoose = require('mongoose');

//----------Open up all tickets/change status to false---------
//-----change status from : true -> false ---------------------
router.patch('/',(req,res,next) => {
    // res.status(200).json({
    //     message:"Hello"
    // })
    Ticket.update({ status:'true' },{ $set:{status:'false'}}, {multi :true})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message :"Ticket is Updated",
            request:{
                type:'GET',
                url:'http://localhost:3000/tickets/open',
                EC2_url :"http://ec2-18-191-155-75.us-east-2.compute.amazonaws.com:3000/tickets/open"
            }
        })
    })
    .catch( err => {
        console.log(err)
        res.status(500).json(err)
    })
});

module.exports = router;