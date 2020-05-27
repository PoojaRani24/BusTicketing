const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../models/ticket')

//----------Book a Ticket---------------
router.post('/book',(req,res,next) => {
    const ticket = new Ticket({
        _id:mongoose.Types.ObjectId(),
         status:true,
         name : req.body.name,
         src:req.body.src,
         des:req.body.des,
    });
    ticket
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message : "Handling POST Request to /tickets/book",
        ticketdetails:ticket
    });
});

//----------View Open tickets---------

router.get('/open',(req,res,next) => {
    res.status(200).json({
        message : "Handling GET Request to /tickets/open"
    });
});

//----------View Close tickets---------

router.get('/close',(req,res,next) => {
    res.status(200).json({
        message : "Handling GET Request to /tickets/close"
    });
});

//------view a ticket by Id-------------------
router.get('/:ticketId',(req,res,next) => {
    const id=req.params.ticketId;
    // res.status(200).json({
    //     message : "Handling GET Request to /tickets/"+id
    // });
    Ticket.findById(id)
    .exec()
    .then(doc => {
        console.log("From db ",doc);
        res.sendStatus(200).json(doc);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err});
    });
});

//----------View Ticket Status---------

router.get('/:ticketId/status',(req,res,next) => {
    const id=req.params.ticketId;
    res.status(200).json({
        message : "Handling GET Request to /tickets/"+id+"/status"
    });
});

//----------View Ticket Details---------

router.get('/:ticketId/details',(req,res,next) => {
    const id=req.params.ticketId;
    res.status(200).json({
        message : "Handling GET Request to /tickets/"+id+"/details"
    });
});

//----------Update tickets status and User details---------

router.patch('/:ticketId/update',(req,res,next) => {
    const id=req.params.ticketId;
    res.status(201).json({
        message : "Handling PATCH Request to /tickets/"+id+"/update"
    });
});

module.exports = router;