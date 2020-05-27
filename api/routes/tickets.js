const express = require('express');
const router  = express.Router();

//----------Book a Ticket---------------
router.post('/book',(req,res,next) => {
    const user = {
        name:req.body.name,
        src:req.body.src,
        des:req.body.des,
        number:req.body.number
    }
    res.status(200).json({
        message : "Handling POST Request to /tickets/book",
        userdetails:user
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

//----------Update tickets status and User details---------

router.patch('/:ticketId/update',(req,res,next) => {
    const id=req.params.ticketId;
    res.status(201).json({
        message : "Handling PATCH Request to /tickets/"+id+"/update"
    });
});

module.exports = router;