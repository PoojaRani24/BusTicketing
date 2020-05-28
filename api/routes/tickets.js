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
        res.status(201).json({
            message : "Handling POST Request to /tickets/book",
            ticketdetails:result
        });
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err})
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
    // res.status(200).json({
    //     message : "Handling GET Request to /tickets/close"
    // });
    Ticket.find()
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc.length>0){
        res.status(200).json(doc)
        }
        else{
        res.status(404).json({
            message : "No Tickets in DB"
        })
    }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message:"Error occured while fetching all booked/closed tickets"})
    })
});

//------view a ticket by Id-------------------
router.get('/:ticketId',(req,res,next) => {
    const id=req.params.ticketId;
    Ticket.findById(id)
    .exec()
    .then(doc => {
        console.log("From db ",doc);
        if(doc){
        res.status(200).json(doc);
        }
        else{
            res.status(404).json({message:"No valid entry for the provided ID"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err});
    });
});

//-----------delete a ticket by Id ---------------
router.delete('/:ticketId',(req,res,next) => {
    const id=req.params.ticketId
    Ticket.remove({_id:id})
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message :"Ticket deleted"
        })
    })
    .catch(err => {
        console/log(err)
        res.send(404).json({
            error:err
        })
    })
})

//----------View Ticket Status---------

router.get('/:ticketId/status',(req,res,next) => {
    const id=req.params.ticketId;
    Ticket.findById(id)
    .exec()
    .then(doc => {
        console.log("From db ",doc);
        if(doc){
            if(doc.status === true){
                res.status(200).json({
                    message :"Your ticket is Booked"
                });
            }
            else{
                res.status(200).json({
                    message :"Your ticket is not Booked"
                });
            }
        }
        else{
            res.status(404).json({message:"No valid entry for the provided ID"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:err});
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