const express = require('express');
const router  = express.Router();

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



module.exports = router;