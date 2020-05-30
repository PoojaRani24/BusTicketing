const express = require('express');
const router  = express.Router();
const mongoose = require('mongoose');
const Ticket = require('../models/ticket')
const Bus = require('../models/bus')

var seat_no

//----------Book a Ticket---------------
router.post('/book',(req,res,next) => {
    //---------------------------
        Ticket.find({status:"true"})
        .exec()
        .then(doc => {
            seat_no=doc.length
            console.log("Entries in db are: ")
            console.log(seat_no)
            console.log("hello bro")
            console.log(doc.length)
            //console.log(req.body)
            if(seat_no<40){
                const ticket = new Ticket({
                    _id:mongoose.Types.ObjectId(),
                     status: req.body.status || true,
                     name : req.body.name,
                     src:req.body.src,
                     des:req.body.des,
                });
                ticket
                .save()
                .then(result => {
                    console.log(result);
                    seat_no=seat_no+1;
                    console.log(seat_no)
                    res.status(201).json({
                        message : "Booked a ticket Successfully",
                        ticketdetails:{
                            _id:result._id,
                            status:result.status,
                            name:result.name,
                            src:result.src,
                            des:result.des,
                            request:{
                                type:'GET',
                                url:"http://localhost:3000/tickets/"+result._id
                            }
                        }
                    });
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({error:err})
                });
            }
            else{
                res.status(500).json({
                    message:"All seats are booked !"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error:err})
        })
       // console.log(seat_no)
    //---------------------------
    
});

//----------View Open tickets---------

router.get('/open',(req,res,next) => {
    Ticket.find({status:"false"})
    .select("_id status name src des")
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc.length>0){
            const response ={
                count: doc.length,
                tickets : doc.map(doc => {
                    return {
                        _id:doc._id,
                        status:doc.status,
                        name:doc.name,
                        src:doc.src,
                        des:doc.des,
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/tickets/'+doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
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

//----------View Close tickets---------

router.get('/close',(req,res,next) => {
    Ticket.find({status:"true"})
    .select("_id status name src des")
    .exec()
    .then(doc => {
        console.log(doc)
        if(doc.length>0){
            const response ={
                count: doc.length,
                tickets : doc.map(doc => {
                    return {
                        _id:doc._id,
                        status:doc.status,
                        name:doc.name,
                        src:doc.src,
                        des:doc.des,
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/tickets/'+doc._id
                        }
                    }
                })
            }
            res.status(200).json(response)
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
    .select("_id status name src des")
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
    Ticket.findById(id)
    .select("_id status name src des")
    .exec()
    .then(doc => {
        console.log("From db ",doc);
        if(doc){
            if(doc.status === true){
                res.status(200).json(doc);
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

//----------Update tickets status and User details---------

router.patch('/:ticketId/update',(req,res,next) => {
    const id=req.params.ticketId;
    const updateOps ={}
    for (const ops of req.body){
        updateOps[ops.propName]=ops.value;
    }
    Ticket.update({ _id:id },{ $set:updateOps })
    .exec()
    .then(result => {
        console.log(result)
        res.status(200).json({
            message :"Ticket is Updated",
            request:{
                type:'GET',
                url:'http://localhost:3000/tickets/'+id
            }
        })
    })
    .catch( err => {
        console.log(err)
        res.send(500).json(err)
    })
});

module.exports = router;